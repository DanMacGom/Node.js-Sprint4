// const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/", (req, res) => {
    const mimetypes = ["image/jpeg", "image/gif", "image/png"]

    const isMimetypeAllowed = (mmtype) => {
        for (const mm of mimetypes) {
            if (mm === mmtype) {
                return true;
            }
        }
        return false;
    }
 
    try {
        if(!req.files) {
            res.send({
                message: 'Specify an image.'
            });
        } else if (!isMimetypeAllowed(req.files.photo.mimetype)) {
            res.send({
                message: "Supported image types are .gif, .png, .jpg or .jpeg."
            });
        } else {
            let photo = req.files.photo;
            photo.mv(`./uploads/${Date.now()}-${photo.name}`);

            res.send({
                message: 'Image uploaded.',
                data: {
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Something went wrong."
        });
    }
});

// const handleError = (err, res) => {
//     console.log(err);

//     res
//     .status(500)
//     .contentType("text/plain")
//     .end("Oops! Something went wrong!");
// };

// const upload = multer({
//   dest: "./tmp"
// });

// router.post("",
//     upload.single("file"),
//     (req, res) => {
//         console.log(req.file.path);
//         const tempPath = req.file.path;

//         const ext = path.extname(req.file.originalname).toLowerCase()

//         const targetPath = path.join(`./uploads/${Date.now()}-image${ext}`);

//         if (ext === ".png" || ext === ".gif" || ext === ".jpg" || ext === ".jpeg") {
//             fs.rename(tempPath, targetPath, err => {
//                 if (err) {
//                     return handleError(err, res);
//                 } 
                    
//                 res
//                 .status(200)
//                 .contentType("text/plain")
//                 .end("File uploaded!");
//             });
//         } else {
//             fs.unlink(tempPath, err => {
//                 if (err) return handleError(err, res);

//                 res
//                 .status(403)
//                 .contentType("text/plain")
//                 .end("Only .png, .jpg (.jpeg), .gif files are allowed!");
//             });
//         }
//     }
// );

module.exports = router;