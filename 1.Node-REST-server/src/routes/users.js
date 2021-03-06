const express = require("express");

// const user = require("../models/users");

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Create new user.
// router.post("/", (req, res) => {
//     user.create({
//         name: req.body.name,
//         age: req.body.age
//     },
//     (err, user) => {
//         if (err) {
//             return res.status(500).send("There was a problem adding the information to the database.");
//         }

//         res.status(200).send(user);
//     });
// });

// Get user.
router.get("/", (req, res) => {
    res.status(200).send({
        name: "John",
        age: 30,
        url: req.hostname + `:${process.env.APP_PORT}`+ req.baseUrl + req.path
    });
    // user.find({}, (err, user) => {
    //     if (err) {
    //         return res.status(500).send("There was a problem finding the user.");
    //     }

    //     if (!user) {
    //         return res.status(404).send("No user found.");
    //     }

    //     req.body.url = req.hostname + `:${process.env.APP_PORT}`+ req.baseUrl + req.path;
    //     res.status(200).send(req.body);
    // });
});

module.exports = router;