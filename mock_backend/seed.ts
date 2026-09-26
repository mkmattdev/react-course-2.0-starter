import type { Place } from "../src/models/place.ts";

export const SEED_PLACES: Place[] = [
  {
    id: "kyoto-gardens",
    name: "Kyoto’s quiet gardens",
    category: "culture",
    description:
      "Take the slower path through moss gardens and temple courtyards. A little space to pause, far from your everyday routine.",
    isVisited: false,
    costPln: 60,
    addedAt: "2026-01-04",
  },
  {
    id: "dolomites",
    name: "A morning in the Dolomites",
    category: "nature",
    description:
      "Lace up your walking shoes and follow a mountain trail. Leave plenty of time for the views and a well-earned picnic.",
    isVisited: false,
    costPln: 0,
    addedAt: "2026-01-11",
  },
  {
    id: "lisbon",
    name: "Lisbon, one neighbourhood at a time",
    category: "city",
    description:
      "Wander tiled streets, find a sunny square and let the hills set the pace. Your only plan: see what is around the next corner.",
    isVisited: true,
    costPln: 0,
    addedAt: "2026-01-17",
  },
  {
    id: "copenhagen",
    name: "A bakery crawl in Copenhagen",
    category: "food",
    description:
      "Make a small adventure out of coffee and something freshly baked. Pick a neighbourhood and follow whatever looks delicious.",
    isVisited: false,
    costPln: 90,
    addedAt: "2026-01-24",
  },
  {
    id: "lake-bled",
    name: "A slow day at Lake Bled",
    category: "nature",
    description:
      "Trade your usual weekend for lakeside paths and a long lunch. Pack a book and give yourself permission to linger.",
    isVisited: false,
    costPln: 80,
    addedAt: "2026-01-30",
  },
  {
    id: "krakow-kazimierz",
    name: "Kraków’s Kazimierz after dark",
    category: "city",
    description:
      "Wander between courtyards, small galleries and candlelit bars in the old Jewish quarter.",
    isVisited: true,
    costPln: 0,
    addedAt: "2026-02-17",
  },
  {
    id: "san-sebastian-pintxos",
    name: "A pintxos crawl in San Sebastián",
    category: "food",
    description: "Hop between old-town bars and let each counter decide what you eat next.",
    isVisited: false,
    costPln: 180,
    addedAt: "2026-03-01",
  },
  {
    id: "morskie-oko",
    name: "The walk to Morskie Oko",
    category: "nature",
    description:
      "Follow the long road into the Tatras and reward yourself with a mountain lake and hot tea.",
    isVisited: true,
    costPln: 15,
    addedAt: "2026-03-07",
  },
  {
    id: "porto-riverside",
    name: "Porto’s riverside and bridges",
    category: "city",
    description:
      "Cross the Dom Luís I Bridge on foot and watch the city light up from the other bank.",
    isVisited: false,
    costPln: 0,
    addedAt: "2026-03-13",
  },
  {
    id: "berlin-museum-island",
    name: "A day on Berlin’s Museum Island",
    category: "culture",
    description:
      "Choose one museum on the island and follow a single collection from start to finish.",
    isVisited: false,
    costPln: 105,
    addedAt: "2026-03-19",
  },
  {
    id: "budapest-baths",
    name: "Széchenyi thermal baths in Budapest",
    category: "culture",
    description: "Float in the warm outdoor pools while locals play chess around you.",
    isVisited: true,
    costPln: 130,
    addedAt: "2026-04-18",
  },
  {
    id: "alsace-wine-route",
    name: "Villages of the Alsace wine route",
    category: "food",
    description:
      "Drive between half-timbered villages and taste Riesling straight from the cellar.",
    isVisited: false,
    costPln: 260,
    addedAt: "2026-08-15",
  },
];
