const Player = require("../models/playersModel");
const responses = require("../responses/responses");

function createPlayer(req, res) {
    if (responses.emptyContent(req, res)) {
        return;
    }

    const player = new Player((req.body.playerName === "") ? "Anonymous" : req.body.playerName);

    player.create(
        player, 
        (err, data) => {
            responses.entityErrorNotFoundAlreadyExistsData(
                req, res, err, data, "playerCreateError", null, "playerAlreadyExists"
            );
        }
    );
}

function updatePlayerById(req, res) {
    if (responses.emptyContent(req, res)) {
        return;
    }

    const player = new Player(req.body.playerName);

    player.update(
        req.params.playerId, 
        player,
        (err, data) => {
            responses.entityErrorNotFoundAlreadyExistsData(
                req, res, err, data, "playerUpdateError", "playerNotFound", "playerAlreadyExists"
            );
        }
    );
}

module.exports = {
    createPlayer,
    updatePlayerById
}
