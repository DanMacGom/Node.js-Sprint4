const express = require("express");
const multer = require("multer");
const MulterGridfsStorage = require("multer-gridfs-storage");

const imgUpload = require("../models/images");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const storage = new MulterGridfsStorage({
    url: "mongodb://localhost:27017/images",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = [ "image/png", "image/gif", "image/jpg" ];

        if (match.indexOf(file.mimetype) == -1) {
            return 
        }
    }
});

// New image.
router.post("/upload", (req, res) => {
    let upload = multer({})

    user.create({
        name: req.body.name,
        age: req.body.age
    },
    (err, user) => {
        if (err) {
            return res.status(500).send("There was a problem adding the information to the database.");
        }

        res.status(200).send(user);
    });
});