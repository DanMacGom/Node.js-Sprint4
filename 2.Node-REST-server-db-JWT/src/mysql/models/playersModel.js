const { v4: uuidv4 } = require('uuid');
const con = require("./mysqlDB");
const DBChecks = require("./DBChecks");

class Player extends DBChecks {
    constructor(playerName, playersTable, playerIdColumn, playerNameColumn) {
        super(playersTable, playerIdColumn, playerNameColumn);
        this.playerName = playerName;
    }

    async create(player, result) {
        const playerNameDoesntExist = !(await this.checkIfEntityExistsInDB(player, "playerName", this.playersTable, this.playerNameColumn)).exists;

        if (playerNameDoesntExist) {
            con.query(
                `
                INSERT INTO
                    ${this.playersTable} (${this.playerNameColumn})
                VALUES
                    (?);
                `,
                player.playerName === "Anonymous" ? uuidv4() : player.playerName,
                (err, query_result) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    }
                    
                    result(null, { id: query_result.insertId, playerName: player.playerName });
                }
            );
        } else {
            result(null, { alreadyExists: true });
        }
    }

    async update(id, player, result) {
        const playerNameDoesntExist = !(await this.checkIfEntityExistsInDB(player, "playerName", this.playersTable, this.playerNameColumn)).exists;

        if (playerNameDoesntExist) {
            con.query(
                `
                UPDATE
                    ${this.playersTable}
                SET
                    ${this.playerNameColumn} = ?
                WHERE
                    ${this.playerIdColumn} = '${id}';
                `,
                player.playerName,
                (err, query_result) => {
                    if (err) {
                        console.log(err);
                        result(err, null);
                    } 

                    result(null, { id: id, newPlayerName: player.playerName, affectedRows: query_result.affectedRows })
                }
            );
        } else {
            result(null, { alreadyExists: true });
        }
    }
}

module.exports = Player;