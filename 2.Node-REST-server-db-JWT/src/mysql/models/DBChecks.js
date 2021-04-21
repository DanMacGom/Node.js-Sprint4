const con = require("./mysqlDB");

class DBChecks {
    constructor() {
        this.playersTable = "DiceGameDB.players";
        this.gamesTable = "DiceGameDB.games";
        this.rollSumColumn = "roll_sum";
        this.playerIdColumn = "player_id";
        this.playerNameColumn = "player_name";    
        this.winColumn = "win";
    }

    checkIfEntityExistsInDB(entity, property, table, column) {        
        return new Promise(
            (resolve, reject) => {
                con.query(
                    `
                    SELECT
                        ${column}
                    FROM
                        ${table}
                    WHERE
                        ${column} = ?;
                    `,
                    entity[property],
                    (err, query_result) => {
                        if (err) {
                            reject(err);
                        }

                        resolve({ 
                            exists: (Array.isArray(query_result) && query_result.length > 0) ? true : false 
                        });
                    }
                );
            }
        );
    }
}

module.exports = DBChecks;