// src/middleware/errorMiddleware.js
export function notFound(req, res, next) {
	const err = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(err);
}

export function errorHandler(err, req, res, next) {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode).json({
		message: err.message || "Server Error",
		// hide stack in production
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
}
