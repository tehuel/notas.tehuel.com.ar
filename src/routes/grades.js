import { Router } from "express";
import requireAuth from "../middleware/require-auth.js";

const router = Router();

// GET /api/grades
router.get("/", requireAuth, async (req, res) => {
    // read cookie username
    const githubUsername = req.user;
    if (!githubUsername) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch spreadsheet data from OpenSheet API
    const url = `https://opensheet.elk.sh/${process.env.SPREADSHEET_ID}/${process.env.SHEET_NAME}`;
    const spreadsheetRequest = await fetch(url);
    const spreadsheetData = await spreadsheetRequest.json();

    // Find student data by GitHub username
    const studentData = spreadsheetData.find((student => student.Usuario === githubUsername));
    if (!studentData) {
        return res.status(404).json({ error: "Student data not found" });
    }

    res.json({ ...studentData });
});

export default router;