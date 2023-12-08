import model from "./model.js";
import { createWatchlist } from "../watchlist/dao.js";

export const createUser = async (user) => {
	const publicWatchlistId = await createWatchlist().then((w) => w._id);
	const privateWatchlistId = await createWatchlist().then((w) => w._id);

	const newUser = {
		...user,
		publicWatchlist: publicWatchlistId,
		privateWatchlist: privateWatchlistId,
	};

	const currentUser = await model.create(newUser);
	return currentUser;
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
