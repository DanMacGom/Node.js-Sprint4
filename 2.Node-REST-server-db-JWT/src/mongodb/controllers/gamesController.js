const diceRoll = require("../../services/diceGame");
const playerGames = require("../models/playersGamesModel");
const responses = require("../responses/responses");

function createGame(req, res) {
    const rollSum = diceRoll(1, 6) + diceRoll(1, 6);

    playerGames.findByIdAndUpdate(
        req.params.playerId,
        {
            $push: {
                games : {
                    rollSum: rollSum,
                    gameDate: Date.now(),
                    win: rollSum === 7
                }
            }
        },
        { new: true },
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

function deleteGames(req, res) {
    playerGames.findByIdAndUpdate(
        req.params.playerId,
        {
            games: []
        },
        { new: true },
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

function listAllGamesFromPlayer(req, res) {
    playerGames.findById(
        req.params.playerId, { games: 1 },
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

module.exports = {
    createGame,
    deleteGames,
    listAllGamesFromPlayer
}