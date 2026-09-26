import { writeFileSync } from "node:fs";
import { SEED_PLACES } from "./seed.ts";

// json-server reads and rewrites db.json, so every `npm run api` starts from the seed.
writeFileSync("mock_backend/db.json", JSON.stringify({ places: SEED_PLACES }, null, 2));
