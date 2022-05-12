const mongoose = require("mongoose");

interface Round {
	startDate: Date;
	endDate: Date;
}

const IDO = mongoose.Schema(
	{
		name: { type: String },
		description: { type: String },
		ticker: { type: String },
		logo: { type: String },
		cover: { type: String },
		totalRaise: { type: Number },
		maxAllocation: { type: Number },
		currentRoundId: { type: Number, required: true, default: -1 },
		type: { type: String },
		categories: [{ type: String }],
		rounds: [{ startDate: { type: String }, endDate: { type: String } }],
	},
	{
		timestamps: true,
	}
);

//*** --- function for response JSON for record list request
IDO.methods.toIDOJSON = function () {
	return {};
};

mongoose.model("IDO", IDO);
