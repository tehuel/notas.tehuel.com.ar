import { Router } from "express";

const router = Router();

// Render index page with dynamic GitHub Client ID
router.get("/", (req, res) => {
  res.render("index", {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    version: process.env.GITHUB_SHA || "dev",
  });
});

export default router;
