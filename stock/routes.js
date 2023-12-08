import axios from "axios";

const getTickerData = async (ticker) => {
	const url = `https://yfapi.net/v8/finance/chart/${ticker}?range=1d&region=US&interval=1d&lang=en`;

	const config = {
		method: "GET",
		withCredentials: true,
		headers: {
			"x-api-key": process.env.YAHOO_API_KEY,
			"Content-type": "application/json",
		},
	};

	const response = await axios.get(url, config);
	return response.data;
};

async function StockRoutes(app) {
	app.get("/api/stock/:ticker", async (req, res) => {
		const { ticker } = req.params;
		const data = await getTickerData(ticker);

		const quote = data.chart.result[0].indicators.quote[0];
		const stock = {
			ticker: data.chart.result[0].meta.symbol,
			open: quote.open[0],
			close: quote.close[0],
			high: quote.high[0],
			low: quote.low[0],
		};

		res.send(stock);
	});
}

export default StockRoutes;
