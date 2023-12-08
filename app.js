import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import session from "express-session";
import StockRoutes from "./stock/routes.js";
import UserRoutes from "./users/routes.js";
import WatchlistRoutes from "./watchlist/routes.js";

mongoose.connect(process.env.MAKEMONEY_DB_CONNECTION_STRING);
// mongodb+srv://makemoney:realmoneymakers@cluster0.whtpmio.mongodb.net/?retryWrites=true&w=majority
const app = express();
app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL,
	})
);
const sessionOptions = {
	secret: "any string",
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
	};
}
app.use(session(sessionOptions));
app.use(express.json());
StockRoutes(app);
UserRoutes(app);
WatchlistRoutes(app);
app.listen(process.env.PORT || 4000);
