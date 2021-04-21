const express = require("express");

const playersController = require("../controllers/playersController");
const winrateController = require("../controllers/winrateController");

const authJWT = require("../../auth/authenticateJWT");

const playersRouter = express.Router();

playersRouter.post("/", authJWT, playersController.createPlayer);
playersRouter.put("/:playerId", authJWT, playersController.updatePlayerById);
playersRouter.get("/", authJWT, winrateController.calculatePlayerWinrates);

module.exports = playersRouter;