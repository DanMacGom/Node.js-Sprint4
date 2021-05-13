const express = require("express");
const dotenv = require("dotenv/config");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/usersCollection`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const userRoute = require("./src/routes/users");
const html_index = require("./src/routes/index_html");
const html_about = require("./src/routes/about_html");
const uploadRoute = require("./src/routes/upload");

const app = express();

app.use(cors());

// app.set('view engine', 'hbs');

app.use("/", html_index);
app.use("/user", userRoute);
app.use("/about", html_about);
app.use("/upload", uploadRoute);

module.exports = app;