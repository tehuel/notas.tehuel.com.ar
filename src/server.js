import dotenv from "dotenv";
import { createApp } from "./app.js";

dotenv.config({ quiet: true });

const app = createApp();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
