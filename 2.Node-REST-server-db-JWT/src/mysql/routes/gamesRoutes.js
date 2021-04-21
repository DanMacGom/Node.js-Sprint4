const express = require("express");

const gamesController = require("../controllers/gamesController");

const playersRouter = require("../routes/playersRoutes");
const gamesRouter = express.Router({ mergeParams: true });

const authJWT = require("../../auth/authenticateJWT");

playersRouter.use("/:playerId/games", gamesRouter);

gamesRouter.get("/", authJWT, gamesController.listAllGamesFromPlayer);
gamesRouter.post("/", authJWT, gamesController.createGame);
gamesRouter.delete("/", authJWT, gamesController.deleteGamesFromPlayer);

module.exports = gamesRouter;