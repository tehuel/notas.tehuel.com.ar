import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import gradesRouter from "./routes/grades.js";
import githubRouter from "./routes/github.js";
import dotenv from "dotenv";

dotenv.config();

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();

app.use(
  express.static(path.join(__dirname, "../public"))
);
app.use(morgan("combined"));
app.use(cookieParser( process.env.APP_SECRET ));
app.use(express.json());
app.use("/api/grades", gradesRouter);
app.use("/auth/github", githubRouter);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
