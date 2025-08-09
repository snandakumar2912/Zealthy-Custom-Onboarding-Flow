import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import configRoutes from "./src/routes/configRoutes.js";
import submissionRoutes from "./src/routes/submissionRoutes.js";

dotenv.config();

const app = express();

// core middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) =>
	res.json({ status: "ok", uptime: process.uptime() })
);

// ✅ Mount routes BEFORE 404/error handlers
app.use("/api/config", configRoutes);
app.use("/api/submissions", submissionRoutes);

// ❗ These must be LAST
app.use(notFound);
app.use(errorHandler);

// simple health endpoint
app.get("/api/health", (req, res) => {
	res.json({ status: "ok", uptime: process.uptime() });
});

const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on :${PORT}`));
connectDB()
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on :${PORT}`));
	})
	.catch((err) => {
		console.error("Failed to start server:", err);
		process.exit(1);
	});
