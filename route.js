const { exec } = require("child_process");
const fs = require('fs');

const processOutput = prediction => {
    prediction = prediction.split(" ")[1];
    prediction = prediction.replace(/\r?\n|\r/g, "");

    prediction = prediction.split("-");
    prediction.shift();

    prediction = prediction.join('-');
    
    return prediction;
}

module.exports.predict = (filename, res) => {
    return exec(`python3 ./Model/predictor.py ./../uploads/${filename}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`Error: ${error}`);
        } 
        
        let prediction = stdout;
        
        prediction = processOutput(prediction);
        
        let details = JSON.parse(fs.readFileSync(`./data/metadata/${prediction}.json`, 'utf8'));

        res.status(200).json({
            dogName: prediction,
            details: details
        });
    });
}

