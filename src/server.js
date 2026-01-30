import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import gradesRouter from "./routes/grades.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  express.static(path.join(__dirname, "../public"))
);

app.use(express.json());
app.use("/api/grades", gradesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
