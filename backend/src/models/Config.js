// src/models/Config.js
import mongoose from "mongoose";

const configSchema = new mongoose.Schema(
	{
		page2Components: {
			type: [String],
			required: true,
			validate: (v) => Array.isArray(v) && v.length > 0,
		},
		page3Components: {
			type: [String],
			required: true,
			validate: (v) => Array.isArray(v) && v.length > 0,
		},
	},
	{ timestamps: true }
);

// Optional: constrain the values to known component keys
// If you want stricter validation, uncomment:
// const ALLOWED = ['aboutMe', 'address', 'birthdate']
// configSchema.path('page2Components').validate(arr => arr.every(x => ALLOWED.includes(x)))
// configSchema.path('page3Components').validate(arr => arr.every(x => ALLOWED.includes(x)))

export default mongoose.model("Config", configSchema);
