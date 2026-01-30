import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {

    // read cookie username
    const githubUsername = req.signedCookies.github_username;
    if (!githubUsername) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // For demonstration, return a static list of grades
    const grades = [
        { id: 1, student: githubUsername, subject: "Math", grade: 90 },
        { id: 2, student: githubUsername, subject: "Science", grade: 85 },
        { id: 3, student: githubUsername, subject: "History", grade: 88 }
    ];

    res.json({ grades });
});

export default router;