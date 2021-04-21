const mongoose = require("mongoose");

const imgUploadSchema = new mongoose.Schema({
    filename: { type: String },
    filesize: { type: Number },
    base64: { type: String }
});

const imgUpload = mongoose.model("imgUpload", imgUploadSchema);

module.exports = imgUpload;