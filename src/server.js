import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import gradesRouter from "./routes/grades.js";
import githubRouter from "./routes/github.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  express.static(path.join(__dirname, "../public"))
);
app.use(cookieParser( process.env.APP_SECRET ));
app.use(express.json());
app.use("/api/grades", gradesRouter);
app.use("/auth/github", githubRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
