const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;