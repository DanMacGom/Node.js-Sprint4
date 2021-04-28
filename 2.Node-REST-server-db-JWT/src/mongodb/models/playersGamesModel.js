require("./mongoDB");
const mongoose = require("mongoose");

const playerGamesSchema = new mongoose.Schema({
    playerName: { type: String, unique: true },
    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: null },
    games: []
});

const playerGamesModel = mongoose.model("playersGames", playerGamesSchema)

module.exports = playerGamesModel;