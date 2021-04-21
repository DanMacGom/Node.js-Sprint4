const express = require("express");

const winrateController = require("../controllers/winrateController");
const playersRouter = require("../routes/playersRoutes");

const authJWT = require("../../auth/authenticateJWT");

const rankingRouter = express.Router({ mergeParams: true });

playersRouter.use("/ranking", rankingRouter);

rankingRouter.get("/", authJWT, winrateController.globalWinrate);
rankingRouter.get("/loser", authJWT, winrateController.loserWinrate);
rankingRouter.get("/winner", authJWT, winrateController.winnerWinrate);

module.exports = rankingRouter;