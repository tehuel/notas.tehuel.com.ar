import { Router } from "express";
import requireAuth from "../middleware/require-auth.js";
import { getAccessToken, getUser } from "../clients/github-api-client.js";

const router = Router();

// GET /api/github/callback
router.get("/callback", async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: "Authorization code is required" });
        }

        // Exchange code for access token
        const accessToken = await getAccessToken(code);

        // Fetch user profile
        const userData = await getUser(accessToken);

        // Set a cookie with the GitHub username
        res.cookie("github_username", userData.login, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            signed: true,
            sameSite: "lax"
        });

        res.redirect("/");
    } catch (error) {
        console.error("OAuth callback error:", error);
        return res.status(400).json({ error: error.message });
    }
});

// GET /api/github/user
router.get("/user", requireAuth, (req, res) => {
    const username = req.user;
    res.json({ username });
});

// POST /api/github/logout
router.post("/logout", (req, res) => {
    res.clearCookie("github_username");

    res.json({ message: "Successfully logged out" });
});

export default router;