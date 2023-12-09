import * as dao from "./dao.js";

function WatchlistRoutes(app) {
	const addTickerToWatchList = async (req, res) => {
		try {
			const { watchlistId } = req.params;
			const watchlist = await dao.addTickerToWatchList(watchlistId, req.body);
			res.json(watchlist);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	};
	const deleteTickerToWatchList = async (req, res) => {
		try {
			const { watchlistId } = req.params;
			const watchlist = await dao.deleteTickerToWatchList(watchlistId, req.body);
			res.json(watchlist);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	};

	app.put("/api/watchlist/add-to-watchlist", addTickerToWatchList);
	app.put("/api/watchlist/delete-from-watchlist", deleteTickerToWatchList);
}
export default WatchlistRoutes;
