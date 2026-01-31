import { Router } from "express";
import requireAuth from "../middleware/require-auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
    // read cookie username
    const githubUsername = req.user;
    if (!githubUsername) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const spreadsheetRequest = await fetch('https://opensheet.elk.sh/1V1tZg6n3iAC95YJgVhLI__V_cwqvABaHjxzOPTlre5c/1');

    const spreadsheetData = await spreadsheetRequest.json();

    const studentData = spreadsheetData.find((student => student.Usuario === githubUsername));

    if (!studentData) {
        return res.status(404).json({ error: "Student data not found" });
    }

    res.json({ ...studentData });
});

export default router;