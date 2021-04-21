function emptyContent(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ 
            message: "Content cannot be empty!" 
        });

        return true
    }

    if (req.body.playerName === undefined) {
        res.status(400).send({
            message: "You need to specify a playerName."
        });

        return true;
    }
}

function entityErrorNotFoundAlreadyExistsData(req, res, err, data, errMsg, notFoundMsg, alreadyExistsMsg) {
    const msg = {
        "gamesCreateError": "There was a problem with your diceroll.",
        "gamesReadError": `There was an error reading games of player ${req.params.playerId}.`,
        "gamesDeleteError": `There was an error deleting games of player ${req.params.playerId}.`,
        "playerUpdateError": `There was an error updating player with id ${req.params.playerId}.`,
        "playerCreateError": `There was a problem inserting ${req.body.playerName} as your player name.`,
        "StoredProcedureError": "There was a problem with the execution of the stored procedure.",
        "queryError": "There was a problem with the query."
    }

    const notFound = {
        "playerNotFound": `Player with id ${req.params.playerId} not found.`
    }

    const aeErr = {
        "playerAlreadyExists": `A player already exists with name ${req.body.playerName}, try another one`
    }

    if (err) {
        res.status(500).send({
            message: msg[errMsg]
        });
    } else if (data.gamesNotFound) {
        res.status(404).send({
            message: `There are no games for player with id ${req.params.playerId}.`,
        });
    } else if (data.playerNotFound || data.noPlayerForGames || (Array.isArray(data) && data.length === 0)) {
        res.status(404).send({
            message: notFound[notFoundMsg]
        });
    } else if (data.alreadyExists) {
        res.status(409).send({
            message: aeErr[alreadyExistsMsg]
        });
    } else {
        res.status(200).send(data);
    }
}

module.exports = {
    emptyContent,
    entityErrorNotFoundAlreadyExistsData
}