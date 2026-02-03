import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import errorHandler from "./middleware/error-handler.js";
import cookieParser from "cookie-parser";
import gradesRouter from "./routes/grades.js";
import githubRouter from "./routes/github.js";

dotenv.config();

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("combined"));
app.use(errorHandler);
app.use(cookieParser(process.env.APP_SECRET));

app.use("/api/grades", gradesRouter);
app.use("/auth/github", githubRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
