const con = require("./mysqlDB");
const diceRoll = require("../../services/diceGame");
const DBChecks = require("./DBChecks");

class Game extends DBChecks {
    constructor(playerId, gamesTable, playersTable, playerIdColumn, rollSumColumn) {
        super(gamesTable, playersTable, playerIdColumn, rollSumColumn);
        this.playerId = playerId;
        this.rollSum = 0;
        this.win = false;
    }

    async create(game, result) {
        const playerIdExists = (await this.checkIfEntityExistsInDB(game, "playerId", this.playersTable, this.playerIdColumn)).exists;

        if (playerIdExists) {
            con.query(
                `
                INSERT INTO
                    ${this.gamesTable} (${this.playerIdColumn}, ${this.rollSumColumn}, ${this.winColumn})
                VALUES
                    (?, ?, ?);
                `,
                [ game.playerId, game.rollSum, game.win ],
                (err, query_result) => {
                    if (err) {
                        result(err, null);
                    }
        
                    console.log(query_result);
                    result(null, { id: query_result.insertId, playerId: game.playerId, rollSum: game.rollSum, win: game.win });
                }
            );
        } else {
            result(null, { noPlayerForGames: true })
        }
    }

    async delete(game, result) {
        const playerIdExists = (await this.checkIfEntityExistsInDB(game, "playerId", this.playersTable, this.playerIdColumn)).exists;

        if (playerIdExists) {
            con.query(
                `
                CALL DiceGameDB.delete_games_from_player_set_winrate_null (?);
                `,
                game.playerId, 
                (err, query_result) => {
                    if (err) {
                        result(err, null, null);
                    }
    
                    result(null, { playerId: game.playerId, affectedRows: query_result.affectedRows });
                }
            );
        } else {
            result(null, { playerNotFound: true });
        }
    }

    async listAll(game, result) {
        const playerIdPlayers = (await this.checkIfEntityExistsInDB(game, "playerId", this.playersTable, this.playerIdColumn)).exists;
        const playerIdGames = (await this.checkIfEntityExistsInDB(game, "playerId", this.gamesTable, this.playerIdColumn)).exists;

        if (!playerIdPlayers) {
            result(null, { playerNotFound: true });
        }

        if (playerIdPlayers && !playerIdGames) {
            result(null, { gamesNotFound: true });
        }

        if (playerIdPlayers && playerIdGames) {
            con.query(
                `
                SELECT
                    *
                FROM
                    ${this.gamesTable} AS g
                WHERE
                    g.${this.playerIdColumn} = ?
                `
                ,
                game.playerId,
                (err, query_result) => {
                    if (err) {
                        result(err, null);
                    }
                    
                    result(null, query_result);
                }
            );
        }
    }

    rollDices() {
        this.rollSum = diceRoll(1, 6) + diceRoll(1, 6);
    }
}

module.exports = Game;