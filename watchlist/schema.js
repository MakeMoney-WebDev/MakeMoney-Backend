import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
	{
		listOfTickers: { type: [String], default: [] },
	},
	{ collection: "watchlist" }
);
export default watchlistSchema;
