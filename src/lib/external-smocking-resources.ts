export type ResourceStatus = "Live chart" | "Newsletter" | "Reference only" | "Unavailable";

export interface ExternalSmockingResource {
  title: string;
  designer: string;
  category: "Christmas" | "Babies" | "Girls" | "Boys";
  href: string;
  status: ResourceStatus;
  note: string;
}

const christmasRoundup = "https://www.pinkhollybushdesigns.com/post/round-up-of-free-christmas-picture-smocking-designs";
const babyRoundup = "https://www.pinkhollybushdesigns.com/post/free-smocking-plates-for-babies";
const girlsRoundup = "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-girls";
const boysRoundup = "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-boys";

export const externalSmockingResources: ExternalSmockingResource[] = [
  { title: "Three Little Kittens Who Lost Their Mittens", designer: "Claire Meldrum", category: "Christmas", href: christmasRoundup, status: "Unavailable", note: "The original downloads are no longer publicly available; the roundup retains a reference image." },
  { title: "Santa and Reindeer", designer: "Sew Beautiful", category: "Christmas", href: "http://sewbeautifulmag.blogspot.com/2012/09/free-daily-design-santa-and-reindeer.html", status: "Live chart", note: "The publisher’s post includes a save-and-print chart." },
  { title: "Santa", designer: "Gwen Milner", category: "Christmas", href: "http://smockingwithgwen.blogspot.com/2010/12/christmas-is-for-sharingsanta-design.html", status: "Live chart", note: "Chart and working notes remain on the designer’s post." },
  { title: "Reindeer", designer: "Gwen Milner", category: "Christmas", href: "http://smockingwithgwen.blogspot.com/2010/12/christmas-is-for-sharingsanta-design.html", status: "Live chart", note: "Shown with the Santa chart and instructions." },
  { title: "Gingerbread Cookies", designer: "Janet Gilbert", category: "Christmas", href: "http://smockingbyjanet.blogspot.com/2009/11/gingerbread-cookies-smocking-plate.html", status: "Live chart", note: "Personal-use chart; follow the designer’s terms." },
  { title: "Christmas Tree / Centering English Smocking", designer: "Trudy Horne", category: "Christmas", href: christmasRoundup, status: "Unavailable", note: "The former Craftsy download is unavailable; use the roundup only as a reference." },
  { title: "Snowmen", designer: "Michie’ Mooney", category: "Christmas", href: "http://creationsbymichie.blogspot.com/2013/12/free-snowman-smocking-design.html", status: "Live chart", note: "The designer’s post links to the chart download." },
  { title: "Christmas Station Wagon", designer: "Michie’ Mooney", category: "Christmas", href: "http://creationsbymichie.blogspot.com/2011/12/christians-christmas-outfit.html", status: "Live chart", note: "The designer’s post links to the station-wagon chart." },
  { title: "Holiday Nutcracker", designer: "Claire Meldrum", category: "Christmas", href: christmasRoundup, status: "Unavailable", note: "The original plate is not currently verifiable; the designer does not permit reposting." },

  { title: "Baby Balloons", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2010/07/free-balloon-smocking-design.html", status: "Live chart", note: "The designer’s post links to a downloadable chart." },
  { title: "Baby Bunnies — Straight Yoke", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2014/03/free-baby-bunnies-smocking-design.html", status: "Live chart", note: "Straight-yoke and bishop versions are linked separately." },
  { title: "Baby Bunnies — Bishop", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2014/03/free-baby-bunnies-smocking-design.html", status: "Live chart", note: "Straight-yoke and bishop versions are linked separately." },
  { title: "Christian’s Elephants", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2011/07/free-smocked-elephant-design.html", status: "Live chart", note: "The FREE link in the post opens the chart." },
  { title: "Emma’s Lambs", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2012/02/emmas-lambs.html", status: "Live chart", note: "The designer’s post links to a downloadable chart." },
  { title: "Sailboats", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2012/06/sailboats-smocking-design.html", status: "Live chart", note: "The designer’s post links to a downloadable chart." },
  { title: "Cross", designer: "Michie’ Mooney", category: "Babies", href: "http://creationsbymichie.blogspot.com/2012/03/free-cross-smocking-design.html", status: "Live chart", note: "The original post links to the complete cross chart." },
  { title: "Hello Ducky", designer: "Lisa Hawkes / Pink Hollybush Designs", category: "Babies", href: "https://www.pinkhollybushdesigns.com/post/curved-smocking-tutorial-free-hello-ducky-smocking-plate", status: "Reference only", note: "Tutorial and photographs remain live, but no current public chart file was located." },
  { title: "Wee Care Smocking Plate", designer: "Lisa Hawkes / Pink Hollybush Designs", category: "Babies", href: "https://www.pinkhollybushdesigns.com/post/sewing-weecare-gowns-for-charity-resources-freepatterns", status: "Live chart", note: "The charitable-sewing resource page links to the PDF." },
  { title: "Two Additional Wee Care Graphs", designer: "Pink Hollybush Designs", category: "Babies", href: "https://www.pinkhollybushdesigns.com/newsletter", status: "Newsletter", note: "Historically offered to newsletter subscribers; current delivery could not be verified." },

  { title: "Strawberry Fields", designer: "Debbie Glenn / Love and Stitches", category: "Girls", href: "http://www.loveandstitches.com/articles.htm", status: "Live chart", note: "Issue 105 resources include instructions and a printable plate." },
  { title: "Cinderella", designer: "Gwen Milner", category: "Girls", href: "http://smockingwithgwen.blogspot.com/2015/03/sharing-cinderellacirca-1985.html", status: "Live chart", note: "Graph and stitch-by-stitch instructions are embedded in the post." },
  { title: "Merry Mermaid", designer: "Dandelion Avenue", category: "Girls", href: girlsRoundup, status: "Reference only", note: "Only a finished reference photograph remains; no exact chart was located." },
  { title: "Cupcake", designer: "My Treasured Heirlooms", category: "Girls", href: girlsRoundup, status: "Reference only", note: "The original site is gone and no exact chart was located." },
  { title: "Bouquet of Flowers", designer: "My Treasured Heirlooms", category: "Girls", href: girlsRoundup, status: "Reference only", note: "The original site is gone and no exact chart was located." },
  { title: "Poodle", designer: "My Treasured Heirlooms", category: "Girls", href: girlsRoundup, status: "Reference only", note: "The original site is gone and no exact chart was located." },
  { title: "Sunbonnet Sue", designer: "My Treasured Heirlooms", category: "Girls", href: girlsRoundup, status: "Reference only", note: "The original site is gone and no exact chart was located." },
  { title: "Posy of Pansies", designer: "Claire Meldrum", category: "Girls", href: "https://www.clairemeldrum.ca/?p=2326", status: "Unavailable", note: "The former printable PDF is not currently accessible; link-sharing only was authorized." },
  { title: "Butterfly Sparkle", designer: "Angela Atherton / Sew Beautiful", category: "Girls", href: "http://sewbeautifulmag.blogspot.com/2014/03/stitch-cheerful-butterfly-smocking.html", status: "Live chart", note: "The chart, colors, and detailed notes remain embedded." },
  { title: "Blooming Rose", designer: "Lisa Hawkes / Pink Hollybush Designs", category: "Girls", href: "https://www.pinkhollybushdesigns.com/post/2017/07/21/blooming-rose-free-smocking-design", status: "Live chart", note: "The original post includes the complete graph image." },
  { title: "Reese’s Garden of Hearts", designer: "Tawn / Pink Hollybush Designs", category: "Girls", href: "https://www.pinkhollybushdesigns.com/post/reeses-garden-of-hearts-free-smocking-plate", status: "Live chart", note: "The guest designer’s complete plate images remain embedded." },
  { title: "Daisy", designer: "Pink Hollybush Designs", category: "Girls", href: "https://www.pinkhollybushdesigns.com/newsletter", status: "Newsletter", note: "Advertised as an emailed newsletter gift; no public chart URL is provided." },

  { title: "Pirate Adventures", designer: "Claire Meldrum", category: "Boys", href: "https://www.clairemeldrum.ca/?p=2158", status: "Unavailable", note: "The printable chart is currently unavailable; the designer prohibits reposting and commercial use." },
  { title: "On the Farm", designer: "Claire Meldrum", category: "Boys", href: boysRoundup, status: "Unavailable", note: "The archive entry remains indexed, but no working chart download was verified." },
  { title: "Cars Picture Smocking Plate", designer: "Sew Beautiful", category: "Boys", href: "https://sewbeautifulmag.blogspot.com/2012/09/free-daily-design-cars-picture-smocking.html", status: "Live chart", note: "The publisher’s post includes a save-and-print chart." },
  { title: "Stop Lights", designer: "Janet Gilbert", category: "Boys", href: "https://smockingbyjanet.blogspot.com/2009/07/stop-lights-smocking-plate.html", status: "Live chart", note: "Personal-use chart; follow the designer’s terms." },
  { title: "Little Hippo", designer: "Lisa Hawkes / Pink Hollybush Designs", category: "Boys", href: "https://www.pinkhollybushdesigns.com/post/2017/04/24/a-free-hippo-smocking-plate", status: "Newsletter", note: "Historically emailed to subscribers; no current public chart file was located." },
];

export const roundupLinks = [
  { label: "Christmas roundup", href: christmasRoundup },
  { label: "Babies roundup", href: babyRoundup },
  { label: "Girls roundup", href: girlsRoundup },
  { label: "Boys roundup", href: boysRoundup },
];
