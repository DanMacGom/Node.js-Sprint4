const express = require("express");
const playersRoutes = require("./routes/playersRoutes");
const gamesRoutes = require("./routes/gamesRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const authRoutes = require("../auth/authRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/login", authRoutes);
app.use("/players", playersRoutes);
app.use("/players/:playerId/games", gamesRoutes);
app.use("/players/ranking", rankingRoutes);

module.exports = app;