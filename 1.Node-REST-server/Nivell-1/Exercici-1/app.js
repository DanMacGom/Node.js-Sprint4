const express = require("express");
const cors = require("cors");

const userRoute = require("./src/routes/users");
const html_index = require("./src/routes/index_html");
const html_about = require("./src/routes/about_html");
const uploadRoute = require("./src/routes/upload");

const app = express();

app.use(cors());

app.use("/users", userRoute);
app.use("/index", html_index);
app.use("/about", html_about);
app.use("/upload", uploadRoute);

module.exports = app;