const playerGames = require("../models/playersGamesModel");
const responses = require("../responses/responses");
const { v4: uuidv4 } = require("uuid");

function createPlayer(req, res) {
    if (responses.emptyContent(req, res)) {
        return;
    }

    playerGames.create(
        { playerName: req.body.playerName === "" ? uuidv4() : req.body.playerName },
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

function updatePlayerById(req, res) {
    if (responses.emptyContent(req, res)) {
        return;
    }

    playerGames.findByIdAndUpdate(
        req.params.playerId,
        { 
            playerName: req.body.playerName, 
            updateDate: Date.now()
        },
        { new: true },
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

module.exports = {
    createPlayer,
    updatePlayerById
}