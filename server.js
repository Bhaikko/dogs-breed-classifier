const { exec } = require("child_process")

filename = "1.jpg"
exec(`python3 predictor.py data/single_prediction/${filename}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error}`);
    } 

    let prediction = stdout;
    console.log(prediction);
});