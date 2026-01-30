import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    // generate some random grades
    const grades = Array.from({ length: 10 }, () => Math.floor(Math.random() * 101));
    res.json({ grades });
});

export default router;