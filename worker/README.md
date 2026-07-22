# Smocking plate analyzer Worker

This Worker keeps the OpenAI API key out of the public GitHub Pages bundle. It accepts a compressed plate image, asks OpenAI for schema-validated analysis, and returns only the structured result.

## First deployment

From the `worker` directory:

```bash
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler deploy
```

Before deploying, create a free Turnstile widget in Cloudflare for `sabrina-heyfairy.github.io`. Paste the OpenAI API key and Turnstile secret only when Wrangler prompts for them. Do not put either secret in this repository or in `wrangler.toml`.

Copy the resulting `https://smocking-plate-analyzer.<account>.workers.dev` URL. In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables** and create two variables:

- `PLATE_ANALYZER_URL`: the Worker URL
- `TURNSTILE_SITE_KEY`: the public site key shown on the Turnstile widget page

Re-run the Pages workflow or push a commit.

For local testing, change `ALLOWED_ORIGIN` temporarily or create a separate Wrangler development environment. Never deploy production with `ALLOWED_ORIGIN = "*"`.
