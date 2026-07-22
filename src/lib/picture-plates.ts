import type { PictureSmockingChart, PlateMeta, PlateThread } from "./plate-types";
import { PLATE_COLORWAYS } from "./plate-colorways";

interface PictureSeed {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: PlateMeta["difficulty"];
  garments: string[];
  motif: string[];
  legend: Record<string, string>;
  threads: PlateThread[];
  sourceLabel: string;
  sourceHref: string;
}

const tile = (motif: string[]) => motif.map((row) => row.repeat(32 / [...row].length));

const colors = {
  green: "#51745b",
  red: "#b9505d",
  gold: "#c49a47",
  blue: "#5c8eae",
  paleBlue: "#9fc5d6",
  pink: "#cf7897",
  white: "#f7f1e8",
  charcoal: "#554e4b",
  brown: "#8a6048",
  yellow: "#d6ab43",
  lavender: "#8a72a3",
  neutral: "#b9aa98",
};

const thread = (id: string, name: string, hex: string): PlateThread => ({ id, name, hex });

const roundupSources = {
  babies: { sourceLabel: "Baby smocking-plate roundup (theme reference)", sourceHref: "https://www.pinkhollybushdesigns.com/post/free-smocking-plates-for-babies" },
  christmas: { sourceLabel: "Christmas picture-smocking roundup (theme reference)", sourceHref: "https://www.pinkhollybushdesigns.com/post/round-up-of-free-christmas-picture-smocking-designs" },
  girls: { sourceLabel: "Girls’ picture-smocking roundup (theme reference)", sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-girls" },
  boys: { sourceLabel: "Boys’ picture-smocking roundup (theme reference)", sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-boys" },
} as const;

const seeds: PictureSeed[] = [
  {
    slug: "christmas-ornament-row",
    title: "Christmas Ornament Row",
    subtitle: "Jewel-colored baubles built from stacked cable stitches",
    category: "Picture Smocking · Christmas",
    difficulty: "intermediate",
    garments: ["Christmas bishop", "holiday yoke", "romper"],
    motif: ["...g....", "..ggg...", "..grg...", ".grrrg..", ".rryrr..", "..rrr...", "...r....", "........"],
    legend: { g: "green", r: "red", y: "gold" },
    threads: [thread("green", "Pine", colors.green), thread("red", "Berry red", colors.red), thread("gold", "Antique gold", colors.gold), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Christmas picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/round-up-of-free-christmas-picture-smocking-designs",
  },
  {
    slug: "snowman-parade-picture",
    title: "Snowman Parade",
    subtitle: "Tiny snowmen with hats, scarves, and coal buttons",
    category: "Picture Smocking · Christmas",
    difficulty: "advanced",
    garments: ["winter yoke", "Christmas romper", "sampler"],
    motif: ["..kkk...", ".kkkkk..", "..www...", ".wwwww..", ".wrwww..", ".wwkww..", "..www...", ".wwwww..", "..w.w...", "........"],
    legend: { k: "charcoal", w: "white", r: "red" },
    threads: [thread("charcoal", "Charcoal", colors.charcoal), thread("white", "Snow", colors.white), thread("red", "Scarf red", colors.red), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Christmas picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/round-up-of-free-christmas-picture-smocking-designs",
  },
  {
    slug: "balloon-bouquet-picture",
    title: "Balloon Bouquet",
    subtitle: "Three floating balloons with fine trailing strings",
    category: "Picture Smocking · Babies",
    difficulty: "beginner",
    garments: ["baby yoke", "daygown", "first-birthday romper"],
    motif: ["..p..b..", ".pppbbb.", ".pppbbb.", "..p..b..", "...y....", "..yyy...", "..yyy...", "...y....", "..k.k...", ".k..k...", "........"],
    legend: { p: "pink", b: "blue", y: "yellow", k: "charcoal" },
    threads: [thread("pink", "Blush", colors.pink), thread("blue", "Sky", colors.blue), thread("yellow", "Buttercup", colors.yellow), thread("charcoal", "String", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Baby smocking-plate roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-smocking-plates-for-babies",
  },
  {
    slug: "sleepy-bunny-pair",
    title: "Sleepy Bunny Pair",
    subtitle: "Long-eared baby bunnies worked in soft picture-smocking blocks",
    category: "Picture Smocking · Babies",
    difficulty: "intermediate",
    garments: ["baby bishop", "daygown", "bonnet band"],
    motif: [".w...w..", ".ww.ww..", "..www...", ".wwwww..", ".wkwkw..", ".wwpww..", "..www...", ".wwwww..", ".w...w..", "........"],
    legend: { w: "white", k: "charcoal", p: "pink" },
    threads: [thread("white", "Bunny cream", colors.white), thread("charcoal", "Eyes", colors.charcoal), thread("pink", "Nose", colors.pink), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Baby smocking-plate roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-smocking-plates-for-babies",
  },
  {
    slug: "strawberry-basket-picture",
    title: "Strawberry Basket",
    subtitle: "Red berries and green caps in a compact repeating basket",
    category: "Picture Smocking · Girls",
    difficulty: "intermediate",
    garments: ["girl’s yoke", "summer bishop", "pinafore"],
    motif: ["..g.g...", ".ggggg..", "..r.r...", ".rrrrr..", ".ryryr..", "..rrr...", "..bbb...", ".bbbbb..", "........"],
    legend: { g: "green", r: "red", y: "gold", b: "brown" },
    threads: [thread("green", "Leaf", colors.green), thread("red", "Strawberry", colors.red), thread("gold", "Seed", colors.gold), thread("brown", "Basket", colors.brown), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Girls’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-girls",
  },
  {
    slug: "garden-heart-vines",
    title: "Garden Heart Vines",
    subtitle: "Pink hearts joined by a small green garden vine",
    category: "Picture Smocking · Girls",
    difficulty: "beginner",
    garments: ["girl’s bishop", "yoke", "bonnet"],
    motif: [".pp.pp..", "ppppppp.", "ppppppp.", ".ppppp..", "..ppp...", "...p....", ".g.g.g..", "ggggggg.", "........"],
    legend: { p: "pink", g: "green" },
    threads: [thread("pink", "Rose pink", colors.pink), thread("green", "Garden green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Girls’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-girls",
  },
  {
    slug: "little-sailboat-fleet",
    title: "Little Sailboat Fleet",
    subtitle: "Blue hulls and striped sails above a rolling waterline",
    category: "Picture Smocking · Boys",
    difficulty: "intermediate",
    garments: ["boy’s yoke", "romper", "summer shortall"],
    motif: ["...k....", "..wk....", ".wwwk...", "..bbk...", ".bbbbb..", "..bbb...", "b.b.b.b.", ".b.b.b..", "........"],
    legend: { k: "charcoal", w: "white", b: "blue" },
    threads: [thread("charcoal", "Mast", colors.charcoal), thread("white", "Sail", colors.white), thread("blue", "Ocean blue", colors.blue), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Boys’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-boys",
  },
  {
    slug: "farm-tractor-picture",
    title: "Little Farm Tractor",
    subtitle: "A bright tractor with chunky wheels and field stripe",
    category: "Picture Smocking · Boys",
    difficulty: "advanced",
    garments: ["boy’s yoke", "farm romper", "sampler"],
    motif: [
      "........yyyy....",
      ".......yyyyyy...",
      ".......y....y...",
      "..gggggggggggg..",
      "..ggrggggggggg..",
      "..gggggggggggg..",
      ".gggggggggggggg.",
      "..kkkk....kkkk..",
      ".kkkkkk..kkkkkk.",
      "..kkkk....kkkk..",
      "bbbbbbbbbbbbbbbb",
      ".b.b.b.b.b.b.b.b",
    ],
    legend: { y: "yellow", g: "green", r: "red", k: "charcoal", b: "brown" },
    threads: [thread("yellow", "Sun yellow", colors.yellow), thread("green", "Tractor green", colors.green), thread("red", "Engine red", colors.red), thread("charcoal", "Tire", colors.charcoal), thread("brown", "Field", colors.brown), thread("back", "Back-smocking neutral", colors.neutral)],
    sourceLabel: "Boys’ picture-smocking roundup (theme reference)",
    sourceHref: "https://www.pinkhollybushdesigns.com/post/free-picture-smocking-plates-for-boys",
  },
  {
    slug: "elephant-promenade", title: "Elephant Promenade", subtitle: "Small blue elephants marching trunk to tail", category: "Picture Smocking · Babies", difficulty: "intermediate", garments: ["baby yoke", "romper", "daygown"],
    motif: ["..bbb...", ".bbbbb..", "bbbbbbb.", "bbwb.bb.", ".bbbbb..", "..b.b...", ".b...b..", "........"], legend: { b: "blue", w: "white" },
    threads: [thread("blue", "Elephant blue", colors.paleBlue), thread("white", "Ear highlight", colors.white), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.babies,
  },
  {
    slug: "little-lamb-row", title: "Little Lamb Row", subtitle: "Cream lambs with charcoal faces and tiny green grass", category: "Picture Smocking · Babies", difficulty: "beginner", garments: ["baby bishop", "daygown", "bonnet band"],
    motif: ["..www...", ".wwwww..", "wwkkwww.", ".wwwww..", "..w.w...", ".w...w..", "g.g.g.g.", "........"], legend: { w: "white", k: "charcoal", g: "green" },
    threads: [thread("white", "Lamb cream", colors.white), thread("charcoal", "Face", colors.charcoal), thread("green", "Meadow", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.babies,
  },
  {
    slug: "christening-crosses", title: "Christening Crosses", subtitle: "Quiet gold crosses framed by pale blue cable blocks", category: "Picture Smocking · Babies", difficulty: "beginner", garments: ["christening gown", "baptismal romper", "keepsake bonnet"],
    motif: ["...g....", "...g....", ".ggggg..", "...g....", "...g....", "..bbb...", ".b.b.b..", "........"], legend: { g: "gold", b: "blue" },
    threads: [thread("gold", "Soft gold", colors.gold), thread("blue", "Baptism blue", colors.paleBlue), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.babies,
  },
  {
    slug: "hello-ducklings", title: "Hello Ducklings", subtitle: "Sunny ducklings paddling over a blue ripple", category: "Picture Smocking · Babies", difficulty: "intermediate", garments: ["baby yoke", "spring romper", "daygown"],
    motif: ["..yy....", ".yyyy...", "yyyyyy..", "yykyyy..", ".yyyy...", "..y.y...", "b.b.b.b.", ".b.b.b.."], legend: { y: "yellow", k: "charcoal", b: "blue" },
    threads: [thread("yellow", "Duckling yellow", colors.yellow), thread("charcoal", "Eye", colors.charcoal), thread("blue", "Water", colors.blue), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.babies,
  },
  {
    slug: "mitten-kitten-row", title: "Mitten Kittens", subtitle: "Cozy kittens peeking between bright winter mittens", category: "Picture Smocking · Christmas", difficulty: "advanced", garments: ["winter yoke", "holiday bishop", "sampler"],
    motif: [".k...k..", "kkk.kkk.", ".kkkkk..", ".kwkwk..", "..kkk...", ".r...g..", "rrr.ggg.", ".r...g.."], legend: { k: "charcoal", w: "white", r: "red", g: "green" },
    threads: [thread("charcoal", "Kitten gray", colors.charcoal), thread("white", "Whisker cream", colors.white), thread("red", "Berry mitten", colors.red), thread("green", "Pine mitten", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "santa-sleigh-parade", title: "Santa’s Sleigh Parade", subtitle: "A red sleigh following a tiny gold-star path", category: "Picture Smocking · Christmas", difficulty: "advanced", garments: ["Christmas yoke", "holiday romper", "sampler"],
    motif: ["..yyyy..........", "...y............", ".rrrrrr.........", "rrrrrrrrrr......", "rrwwrrrrrr......", ".rrrrrrrr.......", "..kkkk..kkkk....", "...kk....kk....."], legend: { y: "gold", r: "red", w: "white", k: "charcoal" },
    threads: [thread("gold", "Star gold", colors.gold), thread("red", "Sleigh red", colors.red), thread("white", "Fur trim", colors.white), thread("charcoal", "Runners", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "jolly-santa-row", title: "Jolly Santa Row", subtitle: "Cheerful red hats above snowy beards", category: "Picture Smocking · Christmas", difficulty: "intermediate", garments: ["holiday bishop", "Christmas shortall", "stocking cuff"],
    motif: ["...r....", "..rrr...", ".rrrrr..", ".rwwwr..", ".wkwkw..", ".wwwww..", "..www...", "........"], legend: { r: "red", w: "white", k: "charcoal" },
    threads: [thread("red", "Santa red", colors.red), thread("white", "Beard white", colors.white), thread("charcoal", "Face details", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "rudolph-reindeer-row", title: "Reindeer Row", subtitle: "Brown reindeer faces with one bright red nose", category: "Picture Smocking · Christmas", difficulty: "intermediate", garments: ["winter yoke", "Christmas romper", "sampler"],
    motif: ["b.b...b.", ".bb.bb..", "..bbb...", ".bbbbb..", ".bkbkb..", "..brb...", "..bbb...", "........"], legend: { b: "brown", k: "charcoal", r: "red" },
    threads: [thread("brown", "Reindeer brown", colors.brown), thread("charcoal", "Eyes", colors.charcoal), thread("red", "Red nose", colors.red), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "gingerbread-bakery", title: "Gingerbread Bakery", subtitle: "Iced gingerbread friends with candy-button details", category: "Picture Smocking · Christmas", difficulty: "advanced", garments: ["holiday yoke", "cookie-baking apron", "sampler"],
    motif: ["..bbb...", ".bbbbb..", "bbwbwbb.", ".bbbbb..", ".rbbbgr.", "..bbb...", ".b...b..", "........"], legend: { b: "brown", w: "white", r: "red", g: "green" },
    threads: [thread("brown", "Gingerbread", colors.brown), thread("white", "Icing", colors.white), thread("red", "Candy red", colors.red), thread("green", "Candy green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "evergreen-tree-row", title: "Evergreen Tree Row", subtitle: "Layered pine trees dotted with tiny gold lights", category: "Picture Smocking · Christmas", difficulty: "beginner", garments: ["Christmas bishop", "holiday yoke", "napkin band"],
    motif: ["...g....", "..ggg...", ".ggygg..", "ggggggg.", "..gyg...", ".ggggg..", "...b....", "........"], legend: { g: "green", y: "gold", b: "brown" },
    threads: [thread("green", "Evergreen", colors.green), thread("gold", "Tree lights", colors.gold), thread("brown", "Trunk", colors.brown), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "holiday-station-wagon", title: "Holiday Station Wagon", subtitle: "A green wagon carrying a rooftop Christmas tree", category: "Picture Smocking · Christmas", difficulty: "advanced", garments: ["boy’s holiday yoke", "Christmas shortall", "sampler"],
    motif: [".....g..........", "....ggg.........", "...ggggg........", "..bbbbbbbbbb....", ".bggggggggggb...", "bbbbbbbbbbbbbb..", "..kkkk....kkkk..", ".kkkkkk..kkkkkk."], legend: { g: "green", b: "blue", k: "charcoal" },
    threads: [thread("green", "Wagon green", colors.green), thread("blue", "Window blue", colors.paleBlue), thread("charcoal", "Tires", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "nutcracker-guards", title: "Nutcracker Guards", subtitle: "Toy guards in red coats and tall charcoal hats", category: "Picture Smocking · Christmas", difficulty: "advanced", garments: ["formal holiday yoke", "Christmas bishop", "sampler"],
    motif: ["..kkk...", ".kkkkk..", ".wkwkw..", "..www...", ".rrrrr..", ".ryryr..", ".rrrrr..", "..k.k..."], legend: { k: "charcoal", w: "white", r: "red", y: "gold" },
    threads: [thread("charcoal", "Hat and boots", colors.charcoal), thread("white", "Face", colors.white), thread("red", "Guard red", colors.red), thread("gold", "Uniform gold", colors.gold), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.christmas,
  },
  {
    slug: "midnight-princess", title: "Midnight Princess", subtitle: "A blue ball gown beneath a tiny gold crown", category: "Picture Smocking · Girls", difficulty: "advanced", garments: ["party yoke", "birthday bishop", "dress sash"],
    motif: ["...y....", "..yyy...", "...w....", "..www...", "...b....", "..bbb...", ".bbbbb..", "bbbbbbb."], legend: { y: "gold", w: "white", b: "blue" },
    threads: [thread("gold", "Crown gold", colors.gold), thread("white", "Pearl", colors.white), thread("blue", "Midnight blue", colors.blue), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "merry-mermaid", title: "Merry Mermaid", subtitle: "A lavender mermaid with a sea-green tail", category: "Picture Smocking · Girls", difficulty: "advanced", garments: ["summer yoke", "beach dress", "sampler"],
    motif: ["..llll..", ".llwll..", "..www...", "..lwl...", "...gg...", "..ggg...", ".gg.gg..", "b.b.b.b."], legend: { l: "lavender", w: "white", g: "green", b: "blue" },
    threads: [thread("lavender", "Mermaid lavender", colors.lavender), thread("white", "Pearl", colors.white), thread("green", "Sea green", colors.green), thread("blue", "Water", colors.blue), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "birthday-cupcakes", title: "Birthday Cupcakes", subtitle: "Pink-frosted cakes with gold candle flames", category: "Picture Smocking · Girls", difficulty: "beginner", garments: ["birthday yoke", "party bishop", "apron band"],
    motif: ["...y....", "...r....", "..ppp...", ".ppppp..", ".pwpwp..", "..bbb...", ".bbbbb..", "........"], legend: { y: "gold", r: "red", p: "pink", w: "white", b: "brown" },
    threads: [thread("gold", "Flame", colors.gold), thread("red", "Candle", colors.red), thread("pink", "Frosting", colors.pink), thread("white", "Sprinkles", colors.white), thread("brown", "Cake", colors.brown), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "posy-bouquets", title: "Posy Bouquets", subtitle: "Small pink-and-gold flowers gathered with green stems", category: "Picture Smocking · Girls", difficulty: "intermediate", garments: ["spring bishop", "girl’s yoke", "bonnet band"],
    motif: [".p.y.p..", "pppyppp.", ".p.y.p..", "..ggg...", "...g....", "..ggg...", ".g.g.g..", "........"], legend: { p: "pink", y: "gold", g: "green" },
    threads: [thread("pink", "Petal pink", colors.pink), thread("gold", "Flower gold", colors.gold), thread("green", "Stem green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "little-poodle-parade", title: "Little Poodle Parade", subtitle: "Fluffy cream poodles with pink bows", category: "Picture Smocking · Girls", difficulty: "advanced", garments: ["girl’s yoke", "party dress", "sampler"],
    motif: ["..www...", ".wwwww..", "wwkwpww.", ".wwwww..", "..www...", ".ww.ww..", ".w...w..", "........"], legend: { w: "white", k: "charcoal", p: "pink" },
    threads: [thread("white", "Poodle cream", colors.white), thread("charcoal", "Eye", colors.charcoal), thread("pink", "Bow pink", colors.pink), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "bonnet-garden-girl", title: "Bonnet Garden Girl", subtitle: "A bonneted garden figure carrying a pink posy", category: "Picture Smocking · Girls", difficulty: "advanced", garments: ["pinafore yoke", "garden dress", "sampler"],
    motif: ["..ppp...", ".ppwpp..", "..www...", ".lllll..", "..lgl...", ".lllgl..", "..l.l...", "........"], legend: { p: "pink", w: "white", l: "lavender", g: "green" },
    threads: [thread("pink", "Bonnet pink", colors.pink), thread("white", "Face", colors.white), thread("lavender", "Dress", colors.lavender), thread("green", "Posy", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "pansy-bloom-row", title: "Pansy Bloom Row", subtitle: "Lavender pansies with gold centers and green leaves", category: "Picture Smocking · Girls", difficulty: "intermediate", garments: ["heirloom bishop", "spring yoke", "bonnet"],
    motif: [".ll.ll..", "lllllll.", ".llyll..", "..lll...", ".g.g.g..", "ggggggg.", "..g.g...", "........"], legend: { l: "lavender", y: "gold", g: "green" },
    threads: [thread("lavender", "Pansy lavender", colors.lavender), thread("gold", "Pansy center", colors.gold), thread("green", "Leaf green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "butterfly-meadow", title: "Butterfly Meadow", subtitle: "Blue and pink butterflies floating above green grass", category: "Picture Smocking · Girls", difficulty: "intermediate", garments: ["summer bishop", "girl’s yoke", "sampler"],
    motif: ["b..k..p.", "bb.k.pp.", ".bbkpp..", "...k....", ".bbkpp..", "bb.k.pp.", "g.g.g.g.", "........"], legend: { b: "blue", k: "charcoal", p: "pink", g: "green" },
    threads: [thread("blue", "Butterfly blue", colors.blue), thread("charcoal", "Body", colors.charcoal), thread("pink", "Butterfly pink", colors.pink), thread("green", "Meadow", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "blooming-rose-row", title: "Blooming Rose Row", subtitle: "Layered pink rosebuds over a green leaf band", category: "Picture Smocking · Girls", difficulty: "intermediate", garments: ["heirloom yoke", "girl’s bishop", "bonnet band"],
    motif: ["...p....", "..ppp...", ".pprpp..", ".ppppp..", "..ppp...", ".g.g.g..", "ggggggg.", "........"], legend: { p: "pink", r: "red", g: "green" },
    threads: [thread("pink", "Rose pink", colors.pink), thread("red", "Rose center", colors.red), thread("green", "Leaf green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.girls,
  },
  {
    slug: "pirate-ship-adventure", title: "Pirate Ship Adventure", subtitle: "A tiny dark-hulled ship with a striped sail", category: "Picture Smocking · Boys", difficulty: "advanced", garments: ["boy’s yoke", "summer shortall", "sampler"],
    motif: ["......k.........", ".....kkk........", "....wkwk........", "...wwwkk........", "......k.........", "..bbbbbbbbbb....", ".bbbbbbbbbbbb...", "b.b.b.b.b.b.b.b."], legend: { k: "charcoal", w: "white", b: "blue" },
    threads: [thread("charcoal", "Mast and flag", colors.charcoal), thread("white", "Sail", colors.white), thread("blue", "Hull and sea", colors.blue), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.boys,
  },
  {
    slug: "little-car-parade", title: "Little Car Parade", subtitle: "Bright compact cars rolling over a charcoal road", category: "Picture Smocking · Boys", difficulty: "intermediate", garments: ["boy’s yoke", "romper", "shortall"],
    motif: ["........", "..rr....", ".rrrrr..", "rrrrrrr.", "rbbbrbr.", ".rrrrr..", ".kk.kk..", "kkkkkkkk"], legend: { r: "red", b: "blue", k: "charcoal" },
    threads: [thread("red", "Car red", colors.red), thread("blue", "Window blue", colors.paleBlue), thread("charcoal", "Tires and road", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.boys,
  },
  {
    slug: "traffic-signal-row", title: "Traffic Signal Row", subtitle: "Red, gold, and green lights on charcoal posts", category: "Picture Smocking · Boys", difficulty: "beginner", garments: ["boy’s yoke", "transport romper", "sampler"],
    motif: ["..kkk...", ".krrrk..", ".kyyyk..", ".kgggk..", "..kkk...", "...k....", "...k....", "kkkkkkkk"], legend: { k: "charcoal", r: "red", y: "gold", g: "green" },
    threads: [thread("charcoal", "Signal charcoal", colors.charcoal), thread("red", "Stop red", colors.red), thread("gold", "Caution gold", colors.gold), thread("green", "Go green", colors.green), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.boys,
  },
  {
    slug: "happy-hippo-row", title: "Happy Hippo Row", subtitle: "Round blue-gray hippos with tiny pink ears", category: "Picture Smocking · Boys", difficulty: "intermediate", garments: ["baby shortall", "boy’s yoke", "sampler"],
    motif: [".p...p..", ".bb.bb..", "bbbbbbb.", "bbkbkbb.", ".bbpbb..", "..bbb...", ".b...b..", "........"], legend: { p: "pink", b: "blue", k: "charcoal" },
    threads: [thread("pink", "Ear pink", colors.pink), thread("blue", "Hippo blue-gray", colors.paleBlue), thread("charcoal", "Eyes", colors.charcoal), thread("back", "Back-smocking neutral", colors.neutral)], ...roundupSources.boys,
  },
];

const paletteNames = Object.keys(PLATE_COLORWAYS);

export const picturePlates: PlateMeta[] = seeds.map((seed) => {
  const motifWidth = [...seed.motif[0]].length;
  const repeatCount = 32 / motifWidth;
  const grid = tile([".".repeat(motifWidth), ...seed.motif, ".".repeat(motifWidth)]);
  const chart: PictureSmockingChart = {
    grid,
    legend: seed.legend,
    backSmocking: [
      { row: 1, threadId: "back" },
      { row: grid.length, threadId: "back" },
    ],
  };
  return {
    slug: seed.slug,
    title: seed.title,
    subtitle: seed.subtitle,
    category: seed.category,
    difficulty: seed.difficulty,
    garments: seed.garments,
    rows: grid.length,
    pleats: 33,
    repeatPleats: motifWidth,
    finishedWidth: "About 5.5 in at 6 pleats/in; confirm with a tension sample",
    fabricWidth: "Start with about 16.5 in at 3:1 compression; test this fabric first",
    centerLine: "center pleat 17",
    symmetry: `Center the join between the two middle ${motifWidth}-pleat repeats on pleat 17`,
    threadWeight: "3 strands cotton floss; use 2 strands for tiny details",
    colorSuggestions: paletteNames,
    threads: seed.threads,
    stitchesUsed: ["cable-stitch"],
    description: `${seed.subtitle}. This is a newly charted original teaching plate; the linked roundup is a theme reference, not the source of this stitch chart.`,
    pictureChart: chart,
    sources: [{ label: seed.sourceLabel, href: seed.sourceHref, note: "Theme reference only; this plate is an original chart." }],
    instructions: [
      `Pleat ${grid.length} gathering rows across 33 pleat mountains and mark center pleat 17.`,
      "Back-smock the dashed top and bottom rows from the wrong side before beginning the picture.",
      "Work the dense chart from the bottom row upward, completing one color block at a time.",
      "Each colored horizontal mark is one cable stitch across the adjacent pleat pair.",
      "Keep every cable snug but elastic; compare the shape after each completed row.",
    ],
    tips: [
      "Use separate short lengths for isolated color areas instead of carrying dark thread behind pale fabric.",
      `The ${repeatCount} repeats are identical; verify the first repeat before continuing.`,
    ],
    cells: {},
  };
});

const picturePlateErrors = picturePlates.flatMap((plate) => {
  const chart = plate.pictureChart;
  if (!chart) return [`${plate.slug}: missing picture chart`];
  const errors: string[] = [];
  if (!chart.grid.every((row) => row.length === 32)) errors.push(`${plate.slug}: chart rows must be 32 stitches wide`);
  const marks = new Set(chart.grid.join("").replaceAll(".", ""));
  for (const mark of marks) if (!chart.legend[mark]) errors.push(`${plate.slug}: unmapped chart character ${mark}`);
  if (!plate.sources?.[0]) errors.push(`${plate.slug}: missing source or theme-reference note`);
  return errors;
});
if (new Set(picturePlates.map((plate) => plate.slug)).size !== picturePlates.length) picturePlateErrors.push("picture plates: duplicate slug");
if (picturePlateErrors.length) throw new Error(`Invalid picture plates:\n${picturePlateErrors.join("\n")}`);
