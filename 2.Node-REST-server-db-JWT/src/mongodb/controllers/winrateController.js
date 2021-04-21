const playerGames = require("../models/playersGamesModel");
const responses = require("../responses/responses");

const playerWinratesAggr = [
    { $unwind: "$games" },
    {
        $group: {
            _id: "$_id",
            playerName : { $first: '$playerName' },
            wincount: { 
                $sum: { 
                    $cond: ["$games.win", 1, 0] } 
                },
            totalcount: { $sum: 1 }
        }
    },
    {
        $addFields: {
            _id: "$_id",
            winrate_pct: {
                $multiply: [
                    { $divide: [ "$wincount", "$totalcount" ] }, 
                    100
                ]
            },
            playerName: "$playerName"
        }
    }
]

function calculatePlayerWinrates(req, res) {
    playerGames.aggregate(
        playerWinratesAggr,
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

function globalWinrate (req, res) {
    const globalWinrateAgg = playerWinratesAggr.concat([
        {
            $group: {
                _id: null,
                sumWinrate: { $sum: "$winrate_pct" },
                playersTotalCount: { $sum: 1 }
            }
        },
        {
            $addFields: {
                globalWinrate: { $divide: ["$sumWinrate", "$playersTotalCount"] }
            }
        },
        { $unset: ["sumWinrate", "playersTotalCount", "_id"] }
    ])

    playerGames.aggregate(
        globalWinrateAgg,
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

function loserWinrate(req, res) {
    const loserWinrateAgg = playerWinratesAggr.concat([
        { $sort: { "winrate_pct": 1 } },
        { $limit: 1 }        
    ])
    playerGames.aggregate(
        loserWinrateAgg,
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

function winnerWinrate(req, res) {
    const winnerWinrateAgg = playerWinratesAggr.concat([
        { $sort: { "winrate_pct": -1 } },
        { $limit: 1 }        
    ])

    playerGames.aggregate(
        winnerWinrateAgg,
        (err, data) => responses.standardResponses(req, res, err, data)
    );
}

module.exports = {
    calculatePlayerWinrates,
    globalWinrate,
    loserWinrate,
    winnerWinrate
}