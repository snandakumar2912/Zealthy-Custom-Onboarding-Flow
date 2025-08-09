// src/controllers/configController.js
import Config from "../models/Config.js";

// Ensure there is always a single config document
async function getOrCreateSingleton() {
	let doc = await Config.findOne();
	if (!doc) {
		doc = await Config.create({
			page2Components: ["aboutMe"], // sensible defaults
			page3Components: ["address"],
		});
	}
	return doc;
}

export async function getConfig(req, res, next) {
	try {
		const config = await getOrCreateSingleton();
		res.json(config);
	} catch (err) {
		next(err);
	}
}

export async function updateConfig(req, res, next) {
	try {
		const { page2Components, page3Components } = req.body;

		// Basic validation—keep it strict so Admin UI can't save an empty step
		if (!Array.isArray(page2Components) || page2Components.length === 0) {
			res.status(400);
			throw new Error("page2Components must be a non-empty array");
		}
		if (!Array.isArray(page3Components) || page3Components.length === 0) {
			res.status(400);
			throw new Error("page3Components must be a non-empty array");
		}

		const updated = await Config.findOneAndUpdate(
			{},
			{ page2Components, page3Components },
			{ new: true, upsert: true, runValidators: true }
		);

		res.json(updated);
	} catch (err) {
		next(err);
	}
}
