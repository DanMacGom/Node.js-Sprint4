const express = require("express");
const path = require("path");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../html/about.html"));
});

module.exports = router;