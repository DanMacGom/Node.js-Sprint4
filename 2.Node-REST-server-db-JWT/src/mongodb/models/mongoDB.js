const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve("../../../.env") });

mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/DiceGameDB`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    (err) => {
        if (err) {
            throw err;
        }

        console.log("Connected to mongodb!");
    }
);