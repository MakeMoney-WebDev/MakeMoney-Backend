import * as dao from "./dao.js";

function WatchlistRoutes(app) {
	const addTickerToWatchList = async (req, res) => {
		try {
			const { watchlistId } = req.params;
			const { ticker } = req.body;
			const watchlist = await dao.addTickerToWatchList(watchlistId, ticker);
			res.json(watchlist);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	};
	const deleteTickerFromWatchList = async (req, res) => {
		try {
			const { watchlistId } = req.params;
			const { ticker } = req.body;
			const watchlist = await dao.deleteTickerFromWatchList(watchlistId, ticker);
			res.json(watchlist);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	};
	const findWatchlistById = async (req, res) => {
		try {
			const watchlist = await dao.findWatchlistById(req.params.watchlistId);
			res.json(watchlist);
		} catch (error) {
			res.status(400).json({ message: "Watchlist not found" });
		}
	};

	app.put("/api/watchlist/add-to-watchlist/:watchlistId", addTickerToWatchList);
	app.put("/api/watchlist/delete-from-watchlist/:watchlistId", deleteTickerFromWatchList);
	app.get("/api/watchlist/:watchlistId", findWatchlistById);
}
export default WatchlistRoutes;
