const jwt = require("jsonwebtoken");
const path = require("path");

const dotenv = require("dotenv");

dotenv.config({ path: path.resolve("../../.env") });

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

function authenticateJWT (req, res, next) {
    const token = req.headers["authorization"];

    if (token) {
        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                return res.status(403).send({
                    message: "Token expired."
                });
            }

            req.token = token;
            next();
        });
    } else {
        res.status(401).send({
            message: "You need to add your validated token to the header."
        });
    }
};

module.exports = authenticateJWT;