const con = require("./mysqlDB");

function executeWinrateSP(result) {
    con.query(
        `
        CALL DiceGameDB.calculate_winrates();
        `, 
        (err, query_result) => {
            if (err) {
                console.log(err);

                result(err, null);
            }

            result(null, query_result[0]);
        }
    );
}

function calculateGlobalWinrate(result) {
    con.query(
        `
        SELECT
            AVG(winrate) AS avg_winrate, COUNT(player_id) AS total_players
        FROM
            DiceGameDB.winrates;
        `,
        (err, query_result) => {
            if (err) {
                console.log(err);

                result(err, null);
            }

            result(null, query_result);
        }
    );
}

function sortWinrateTop(orderByType, result) {
    con.query(
        `
        SELECT
            wr.winrate, p.player_id, p.player_name
        FROM
            DiceGameDB.winrates wr
        JOIN
            DiceGameDB.players p
        ON
            wr.player_id = p.player_id
        WHERE
            wr.winrate IS NOT NULL
        ORDER BY
            winrate ${orderByType}
        LIMIT
            1;
        `
        ,
        orderByType,
        (err, query_result) => {
            if (err) {
                console.log(err);

                result(err, null);
            }

            result(null, query_result);
        }
    );
}

module.exports = {
    executeWinrateSP,
    calculateGlobalWinrate,
    sortWinrateTop
}