const jwt = require("jsonwebtoken");
const path = require("path");

const dotenv = require("dotenv");

dotenv.config({ path: path.resolve("../../.env") });

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

function authenticateJWT (req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                res.status(403);
            }

            req.token = token;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;