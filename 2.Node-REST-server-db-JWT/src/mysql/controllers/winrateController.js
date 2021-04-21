const winrateFunctions = require("../models/winrateFunctions");
const responses = require("../responses/responses");

function calculatePlayerWinrates(req, res) {
    winrateFunctions.executeWinrateSP((err, data) => {
        responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "StoredProcedureError", null, null
        );
    });
}

function globalWinrate(req, res) {
    winrateFunctions.calculateGlobalWinrate((err, data) => {
        responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "queryError", null, null
        );
    });
}

function winnerWinrate(req, res) {
    winrateFunctions.sortWinrateTop("DESC", (err, data) => {
        responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "queryError", null, null
        );
    });
}

function loserWinrate(req, res) {
    winrateFunctions.sortWinrateTop("ASC", (err, data) => {
        responses.entityErrorNotFoundAlreadyExistsData(
            req, res, err, data, "queryError", null, null
        );
    });
}

module.exports = {
    calculatePlayerWinrates,
    globalWinrate,
    winnerWinrate,
    loserWinrate
}