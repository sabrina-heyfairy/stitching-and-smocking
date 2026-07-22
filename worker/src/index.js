const MAX_BODY_BYTES = 14 * 1024 * 1024;
const MODEL = "gpt-5.6-terra";

const analysisSchema = {
  type: "object", additionalProperties: false,
  required: ["isSmockingPlate", "confidence", "title", "overview", "rowsToPleat", "workingRows", "repeatPleats", "minimumPleats", "recommendedExtraPleats", "startingPoint", "stitches", "preparation", "steps", "trackingTips", "uncertainties"],
  properties: {
    isSmockingPlate: { type: "boolean" }, confidence: { type: "string", enum: ["low", "medium", "high"] },
    title: { type: "string" }, overview: { type: "string" }, rowsToPleat: { type: ["integer", "null"] },
    workingRows: { type: "array", items: { type: "string" } }, repeatPleats: { type: ["integer", "null"] },
    minimumPleats: { type: ["integer", "null"] }, recommendedExtraPleats: { type: "integer" }, startingPoint: { type: "string" },
    stitches: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "rows", "purpose"], properties: { name: { type: "string" }, rows: { type: "string" }, purpose: { type: "string" } } } },
    preparation: { type: "array", items: { type: "string" } },
    steps: { type: "array", items: { type: "object", additionalProperties: false, required: ["number", "row", "stitch", "direction", "instruction", "checkpoint"], properties: { number: { type: "integer" }, row: { type: "string" }, stitch: { type: "string" }, direction: { type: "string" }, instruction: { type: "string" }, checkpoint: { type: "string" } } } },
    trackingTips: { type: "array", items: { type: "string" } }, uncertainties: { type: "array", items: { type: "string" } },
  },
};

const instructions = `You are a careful hand-smocking teacher reading a photographed smocking plate for an absolute beginner.

Success means:
- identify visible row labels, courses, direction, stitch families, and the complete repeat
- distinguish pleats from stitch intervals (N pleats contain N-1 intervals)
- report a repeat width only when it can be counted from visible evidence
- explain preparation and stitching in the order the maker should perform it
- give concrete checkpoints that catch off-by-one errors
- make uncertainty explicit instead of guessing

Treat solid, dashed, colored, and written instructions as separate evidence. Do not infer a garment's total required pleats unless the image or user notes include enough sizing information. When numbers, symbols, paths, or text are unreadable, use null where allowed and say exactly what must be checked. If this is not a smocking plate, set isSmockingPlate false. Use plain beginner-friendly language. Do not claim this replaces the original designer's instructions.`;

function corsHeaders(origin, allowedOrigin) {
  const permitted = origin && (origin === allowedOrigin || allowedOrigin === "*");
  return { "Access-Control-Allow-Origin": permitted ? origin : allowedOrigin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400", Vary: "Origin" };
}

function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
}

async function verifyTurnstile(token, request, secret) {
  if (!token || !secret) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) form.append("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  const result = await response.json();
  return result.success === true;
}

const worker = {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "https://sabrina-heyfairy.github.io";
    const headers = corsHeaders(origin, allowedOrigin);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return json({ error: "Use POST to analyze a plate." }, 405, headers);
    if (origin !== allowedOrigin && allowedOrigin !== "*") return json({ error: "This site is not allowed to use the analyzer." }, 403, headers);
    if (!env.OPENAI_API_KEY) return json({ error: "The analyzer has not been configured yet." }, 503, headers);
    if (Number(request.headers.get("Content-Length") || 0) > MAX_BODY_BYTES) return json({ error: "The uploaded image is too large." }, 413, headers);

    let body;
    try { body = await request.json(); } catch { return json({ error: "The upload was not valid JSON." }, 400, headers); }
    if (typeof body.image !== "string" || !/^data:image\/(jpeg|png|webp);base64,/.test(body.image)) return json({ error: "Upload a JPG, PNG, or WebP image." }, 400, headers);
    if (body.image.length > MAX_BODY_BYTES) return json({ error: "The uploaded image is too large." }, 413, headers);
    if (!await verifyTurnstile(body.turnstileToken, request, env.TURNSTILE_SECRET_KEY)) return json({ error: "The security check expired or could not be verified. Please try again." }, 403, headers);

    const notes = typeof body.notes === "string" && body.notes.trim() ? `\nUser notes: ${body.notes.trim().slice(0, 500)}` : "";
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || MODEL, reasoning: { effort: "none" }, max_output_tokens: 6000, instructions,
        input: [{ role: "user", content: [{ type: "input_text", text: `Read this smocking plate and create the structured beginner walkthrough.${notes}` }, { type: "input_image", image_url: body.image, detail: "high" }] }],
        text: { format: { type: "json_schema", name: "smocking_plate_analysis", strict: true, schema: analysisSchema } },
      }),
    });
    const responseBody = await openAIResponse.json();
    if (!openAIResponse.ok) {
      console.error("OpenAI request failed", openAIResponse.status, responseBody?.error?.code || "unknown");
      return json({ error: openAIResponse.status === 429 ? "The analyzer is busy or has reached its spending limit. Please try later." : "The image service could not analyze this plate. Please try again." }, 502, headers);
    }
    const content = responseBody.output?.find((item) => item.type === "message")?.content || [];
    const refusal = content.find((item) => item.type === "refusal")?.refusal;
    if (refusal) return json({ error: refusal }, 422, headers);
    const outputText = content.find((item) => item.type === "output_text")?.text;
    if (!outputText) return json({ error: "The analyzer returned no readable result. Please try a clearer image." }, 502, headers);
    try { return json({ analysis: JSON.parse(outputText) }, 200, headers); }
    catch { return json({ error: "The analyzer returned an incomplete result. Please try again." }, 502, headers); }
  },
};

export default worker;
