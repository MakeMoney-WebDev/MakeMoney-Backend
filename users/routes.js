import * as dao from "./dao.js";

function UserRoutes(app) {
	const deleteUser = async (req, res) => {
		const status = await dao.deleteUser(req.params.userId);
		res.json(status);
	};
	const findAllUsers = async (req, res) => {
		const users = await dao.findAllUsers();
		res.json(users);
	};
	const findUserById = async (req, res) => {
		try {
			const user = await dao.findUserById(req.params.userId);
			res.json(user);
		} catch (error) {
			res.status(400).json({ message: "User not found" });
		}
	};
	const findUserByUsername = async (req, res) => {
		try {
			const user = await dao.findUserByUsername(req.params.username);
			res.json(user);
		} catch (error) {
			res.status(400).json({ message: "User not found" });
		}
	};
	const updateUser = async (req, res) => {
		const { userId } = req.params;
		const status = await dao.updateUser(userId, req.body);
		const currentUser = await dao.findUserById(userId);
		req.session["currentUser"] = currentUser;
		res.json(status);
	};
	const signup = async (req, res) => {
		const user = await dao.findUserByUsername(req.body.username);
		if (user) {
			res.status(400).json({ message: "Username already taken" });
			return;
		}
		const currentUser = await dao.createUser(req.body);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	const signin = async (req, res) => {
		try {
			const { username, password } = req.body;
			const currentUser = await dao.findUserByCredentials(username, password);

			if (currentUser) {
				req.session.currentUser = currentUser;
				res.json(currentUser);
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		} catch (error) {
			console.error("Error in signin:", error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	};
	const signout = (req, res) => {
		req.session.destroy();
		res.json(200);
	};
	const account = async (req, res) => {
		res.json(req.session["currentUser"]);
	};

	app.get("/api/users", findAllUsers);
	// app.get("/api/users/:userId", findUserById);
	app.get("/api/users/:username", findUserByUsername);
	app.put("/api/users/:userId", updateUser);
	app.delete("/api/users/:userId", deleteUser);
	app.post("/api/users/signup", signup);
	app.post("/api/users/signin", signin);
	app.post("/api/users/signout", signout);
	app.post("/api/users/account", account);
}
export default UserRoutes;
