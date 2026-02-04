import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import errorHandler from "./middleware/error-handler.js";
import cookieParser from "cookie-parser";
import gradesRouter from "./routes/grades.js";
import githubRouter from "./routes/github.js";

dotenv.config({ quiet: true });

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();

// Configure EJS template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);
app.use(cookieParser(process.env.APP_SECRET));

// Render index page with dynamic GitHub Client ID
app.get("/", (req, res) => {
  res.render("index", {
    githubClientId: process.env.GITHUB_CLIENT_ID || "Ov23li1Ce1nezXP4Au8i"
  });
});

app.use("/api/grades", gradesRouter);
app.use("/auth/github", githubRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);
