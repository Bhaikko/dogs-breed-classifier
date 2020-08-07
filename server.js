const express = require('express');
const multer = require("multer");

const app = express();

const { predict } = require("./route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const upload = multer({
    dest: 'uploads'
});

app.post('/predict', upload.single('dogPhoto'), (req, res) => {
    if (req.file) {
        let filename = req.file.filename; 
        predict(filename, res);

    } else {
        res.status(400).json({
            message: "Something went wrong"
        });
    }
});

app.use(express.static("./public"));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server Up and Running at http://127.0.0.1:${PORT}`);
});