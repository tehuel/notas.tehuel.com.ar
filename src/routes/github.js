import { Router } from "express";

const router = Router();

router.get("/callback", async (req, res) => {
    const { code } = req.query;

    const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })
        }
    );

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        return res.status(400).json({ error: tokenData.error_description });
    }

    const accessToken = tokenData.access_token;

    const userResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/vnd.github.v3+json"
        }
    });

    const userData = await userResponse.json();

    // Set a cookie with the GitHub username
    res.cookie("github_username", userData.login, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        signed: true,
        sameSite: "lax"
    });

    res.redirect("/");
});

router.post("/logout", (req, res) => {
    res.clearCookie("github_username");
    res.json({ message: "Logged out successfully" });
});

export default router;