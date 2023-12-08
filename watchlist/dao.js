import model from "./model.js";
export const createWatchlist = async () => model.create({ listOfTickers: [] });
export const findWatchlistById = async (watchlistId) => model.findById(watchlistId);
export const addTickerToWatchList = async (watchlistId, ticker) => {
	try {
		const watchlist = await findWatchlistById(watchlistId);
		console.log("found watchlist" + watchlist);

		if (watchlist.listOfTickers.includes(ticker)) {
			throw new Error("This stock is already on your watchlist");
		}
		watchlist.listOfTickers.push(ticker);

		const updatedWatchlist = await watchlist.save();

		return updatedWatchlist;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const deleteTickerFromWatchList = async (watchlistId, ticker) => {
	try {
		const watchlist = await findWatchlistById(watchlistId);

		if (!watchlist.listOfTickers.includes(ticker)) {
			throw new Error(`Ticker ${ticker} is not in watchlist`);
		}

		watchlist.listOfTickers = watchlist.listOfTickers.filter((t) => t != ticker);

		const updatedWatchlist = await watchlist.save();

		return updatedWatchlist;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
