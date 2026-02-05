import { Router } from "express";
import requireAuth from "../middleware/require-auth.js";
import { getStudentByUsername } from "../clients/spreadsheet-api-client.js";

const router = Router();

// GET /api/grades
router.get("/", requireAuth, async (req, res) => {
    try {
        const username = req.user;

        // Fetch student data from spreadsheet
        const studentData = await getStudentByUsername(username);

        // Return student data
        res.json({ ...studentData });
    } catch (error) {
        console.error("Grades fetch error:", error);

        if (error.message.includes("Student not found")) {
            return res.status(404).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
});

export default router;