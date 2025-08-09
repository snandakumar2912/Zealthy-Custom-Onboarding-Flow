// src/models/Submission.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
	{
		street: { type: String, default: "" },
		city: { type: String, default: "" },
		state: { type: String, default: "" },
		zip: { type: String, default: "" },
	},
	{ _id: false }
);

const submissionSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		aboutMe: { type: String, default: "" },
		address: { type: addressSchema, default: () => ({}) },
		birthdate: { type: String, default: "" }, // store YYYY-MM-DD from <input type="date">
		step: { type: Number, default: 0 }, // current wizard step (0-based)
	},
	{ timestamps: true }
);

// Unique index so each email has a single row you can upsert into
submissionSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Submission", submissionSchema);
