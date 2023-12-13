import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		publicWatchlist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Watchlist",
		},
		privateWatchlist: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Watchlist",
		},
		role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
	},
	{ collection: "users" }
);
export default userSchema;
