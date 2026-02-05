import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.js";
import indexRouter from "./routes/index.js";
import gradesRouter from "./routes/grades.js";
import githubRouter from "./routes/github.js";

const __dirname = new URL(".", import.meta.url).pathname;

const configureViewEngine = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
};

const registerMiddleware = (app) => {
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser(process.env.APP_SECRET));
};

const registerRoutes = (app) => {
  app.use("/", indexRouter);
  app.use("/api/grades", gradesRouter);
  app.use("/auth/github", githubRouter);
};

export const createApp = () => {
  const app = express();
  
  configureViewEngine(app);
  registerMiddleware(app);
  registerRoutes(app);
  app.use(errorHandler);
  
  return app;
};
