export const songs = [
  {
    id: "1",
    title: "KIRISAME",
    artist: "Mitsukiyo",
    src: "/Theme 1.ogg",
    image: "/Haruna.png",
  },
  {
    id: "2",
    title: "ASDASD",
    artist: "Mitsukiyo",
    src: "/Theme 2.ogg",
    image: "/Akane_(Bunny_Girl).png",
  },
  {
    id: "3",
    title: "Q1WE",
    artist: "ogg",
    src: "/Theme -2.ogg",
    image: "/Ako.png",
  },
  {
    id: "4",
    title: "Mechanical JUNGLE (Hi-Tech Full On MIX)",
    artist: "Mitsukiyo",
    src: "Theme -1.ogg",
    image: "/BG.jpg",
  },
];

export const albums = {
  mitsukiyo: {
    section: "artist",
    image: "/Haruna.png",
    musics: [songs[0], songs[1], songs[2], songs[3]],
  },
  bunnyGirl: {
    section: "vibes",
    image: "/akane_(Bunny_Girl).png",
    musics: [songs[1], songs[3], songs[2], songs[0]],
  },
  akoVibes: {
    section: "collection",
    image: "/Ako.png",
    musics: [songs[2], songs[0], songs[3], songs[1]],
  },
  bgJungle: {
    section: "mixes",
    image: "/BG.jpg",
    musics: [songs[3], songs[1], songs[0], songs[2]],
  },
  midnightVibes: {
    section: "vibes",
    image: "/akane_(Bunny_Girl).png", // Reuse bunny girl image
    musics: [songs[0], songs[2], songs[3], songs[1]],
  },
  acousticCollection: {
    section: "collection",
    image: "/Ako.png", // Reuse Ako image
    musics: [songs[1], songs[0], songs[2], songs[3]],
  },
  urbanMixes: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
  urbanMixessd: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
  urbanMixesa: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
  urbanMixdses: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
  urbandsMixes: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
  urbanMasdixes: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
  urbansdzMixes: {
    section: "mixes",
    image: "/BG.jpg", // Reuse BG image
    musics: [songs[2], songs[3], songs[1], songs[0]],
  },
};
