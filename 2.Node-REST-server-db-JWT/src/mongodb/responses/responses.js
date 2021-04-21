const { validate } = require("uuid");

function emptyContent(req, res) {
    if ((req.body.constructor === Object && Object.keys(req.body).length === 0)) {
        res.status(400).send({ 
            message: "Content cannot be empty!" 
        });

        return true;
    } 
    
    if (req.body.playerName === undefined) {
        res.status(400).send({
            message: "You need to specify a playerName."
        });

        return true;
    }
}

function standardResponses(req, res, err, data) {
    if (err && err.code === 11000) {
        return res.status(409).send({
            message: `A player with name ${req.body.playerName} already exists, try another one.`
        });
    } else if (err) {
        return res.status(500).send({
            message: `An error ocurred with your query.`
        });
    }

    if (validate(data.playerName)) {
        data.playerName = "Anonymous";
    }

    res.status(200).send(data);
}

module.exports = {
    emptyContent,
    standardResponses
}