const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"))

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server Up and Running at http://127.0.0.1:${PORT}`);
});