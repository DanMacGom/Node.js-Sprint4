const express = require("express");

const gamesController = require("../controllers/gamesController");

const playersRouter = require("../routes/playersRoutes");

const authJWT = require("../../auth/authenticateJWT");

const gamesRouter = express.Router({ mergeParams: true });

playersRouter.use("/:playerId/games", gamesRouter)

gamesRouter.get("/", authJWT, gamesController.listAllGamesFromPlayer);
gamesRouter.post("/", authJWT, gamesController.createGame);
gamesRouter.delete("/", authJWT, gamesController.deleteGames);

module.exports = gamesRouter;