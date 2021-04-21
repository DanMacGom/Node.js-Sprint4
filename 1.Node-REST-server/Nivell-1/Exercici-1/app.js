const express = require("express");
const cors = require("cors");
const config = require("dotenv/config");

const db = require("./src/db/users");
const userRoute = require("./src/routes/users");
const html_index = require("./src/routes/index_html");
const html_about = require("./src/routes/about_html");

const app = express();

app.use(cors());

app.use("/users", userRoute);
app.use("/index", html_index);
app.use("/about", html_about);


module.exports = app;