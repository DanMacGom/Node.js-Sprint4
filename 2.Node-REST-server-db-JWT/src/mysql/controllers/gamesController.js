const Game = require("../models/gamesModel");
const responses = require("../responses/responses");

function createGame(req, res) {
    const game = new Game(req.params.playerId);

    game.rollDices();
    game.win = game.rollSum === 7;

    game.create(
        game, 
        (err, data) => responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "gamesCreateError", "playerNotFound", null
        )
    );
}

function deleteGamesFromPlayer(req, res) {
    const game = new Game(req.params.playerId);
    
    game.delete(
        game,
        (err, data) => responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "gamesDeleteError", "playerNotFound", null
        )
    );
}

function listAllGamesFromPlayer(req, res) {
    const game = new Game(req.params.playerId);

    game.listAll(
        game,
        (err, data) => responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "gamesReadError", "playerNotFound", null
        )
    );
}

module.exports = {
    createGame,
    deleteGamesFromPlayer,
    listAllGamesFromPlayer
}