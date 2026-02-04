import { Router } from "express";
import requireAuth from "../middleware/require-auth.js";

const router = Router();

// GET /api/grades
router.get("/", requireAuth, async (req, res) => {
    // Fetch spreadsheet data from OpenSheet API
    const url = `https://opensheet.elk.sh/${process.env.SPREADSHEET_ID}/${process.env.SHEET_NAME}`;
    const spreadsheetRequest = await fetch(url);
    const spreadsheetData = await spreadsheetRequest.json();

    // Validate spreadsheet data
    if (!Array.isArray(spreadsheetData)) {
        return res.status(500).json({ error: "Invalid spreadsheet data" });
    }

    // Find student data by GitHub username
    const githubUsername = req.user;
    const studentData = spreadsheetData.find((student => student.Usuario === githubUsername));
    if (!studentData) {
        return res.status(404).json({ error: "Student data not found" });
    }

    // Finally, return student data
    res.json({ ...studentData });
});

export default router;