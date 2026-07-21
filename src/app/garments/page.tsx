export const metadata = {
  title: "Garment Construction",
  description: "How English smocking fits into bishop dresses, yokes, bonnets, rompers, and more.",
};

const garments = [
  {
    name: "Bishop dresses",
    body: "Smocking at the neckline/chest replaces a separate yoke. Pleat a wide rectangle, smock, then set into the neck binding. Sleeves may include smocked bands.",
  },
  {
    name: "Yokes",
    body: "A smocked insert set into a bodice yoke. Cable borders often frame a wave or honeycomb field. Match pleat count to the yoke width after compression.",
  },
  {
    name: "Sleeves & cuffs",
    body: "Short smocked bands control fullness. Leave enough unsmocked fabric to sew into armseye or cuff cleanly.",
  },
  {
    name: "Bonnets",
    body: "Horizontal rows across the brim or crown. Keep tension gentle so the bonnet still curves around the head.",
  },
  {
    name: "Jon jons, rompers, bubbles",
    body: "Chest panels and pant straps. Durable stitches (cable, outline) suit active wear; reinforce stress points.",
  },
  {
    name: "Nightgowns & day gowns",
    body: "Neckline smocking for softness and stretch. Batiste and voile dominate.",
  },
  {
    name: "Aprons & home decor",
    body: "Pillow inserts, towel bands, lampshade strips — practice ground for new plates.",
  },
];

export default function GarmentsPage() {
  return (
    <article className="site-container max-w-3xl prose-guide py-12 md:py-16">
      <p className="label-caps mb-3 text-dusty-blue">Construction</p>
      <h1 className="font-serif text-4xl text-ink md:!text-5xl">Garment Construction</h1>
      <p>
        Smocking is not applied decoration after the fact — it is usually worked on a panel that
        then becomes part of the garment&rsquo;s structure. Plan seam allowances and neckline
        finishes before you pleat.
      </p>

      {garments.map((g) => (
        <section key={g.name}>
          <h2>{g.name}</h2>
          <p>{g.body}</p>
        </section>
      ))}

      <div className="callout">
        <p className="text-sm">
          Assembly order tip: complete smocking and embroidery on the panel first, then sew major
          seams — never force a finished sleeve through a pleater.
        </p>
      </div>
    </article>
  );
}
