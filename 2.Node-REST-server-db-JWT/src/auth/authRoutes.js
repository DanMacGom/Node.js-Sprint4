const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../.env") });

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authRouter = express.Router();

const user = { username: "Pepe", password: "Handla" };

authRouter.post("/", (req, res) => {
    const { username, password } = req.body;

    if (user.username === username && user.password === password) {
        const accessToken = jwt.sign({ username: username }, accessTokenSecret, { expiresIn: "60m" });
        
        res.json({ accessToken });
    } else {
        res.send({ message: "Username or password incorrect" });
    }
});

module.exports = authRouter;