// src/routes/submissionRoutes.js
import { Router } from "express";
import {
	listSubmissions,
	upsertSubmission,
} from "../controllers/submissionController.js";

const router = Router();

router.get("/", listSubmissions); // GET  /api/submissions
router.post("/", upsertSubmission); // POST /api/submissions

export default router;
