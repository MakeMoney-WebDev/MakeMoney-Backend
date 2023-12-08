import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("watchlist", schema);
export default model;
