// src/routes/configRoutes.js
import { Router } from "express";
import { getConfig, updateConfig } from "../controllers/configController.js";

const router = Router();

router.get("/", getConfig); // GET  /api/config
router.put("/", updateConfig); // PUT /api/config

export default router;
