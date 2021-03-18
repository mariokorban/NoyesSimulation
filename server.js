const express = require('express');

const app = express();
app.use(express.json());

const http = require('http');

const path = require('path');

var fileSystem = require("fs");
var fastcsv = require("fast-csv");

const port = process.env.PORT || 3000

// Use the whole root as static files to be able to serve the html file and
// the build folder

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, '/')));


// Send html on '/'path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, + '/index.html'));
})

// Send html on '/simulation'path
app.get('/simulation', (req, res) => {
    res.sendFile(__dirname+"/simulation.html");
})

app.post('/exportCSV', (req, res) => {
    let boq = 
    [
        {
            "Product": "Quantity",
            "Small KLT": req.body.smallKLT,
            "Medium KLT": req.body.mediumKLT,
            "Big KLT": req.body.bigKLT,
            "Foldable KLT": req.body.foldableKLT,
            "Metal Chassis": req.body.chassis,
            "Bots": req.body.bots,
            "Balconies": req.body.balcony,
            "Metal Cover Sheets": req.body.cover,
            "Tracks": req.body.tracks,
            "Carriers": req.body.carriers
        }
    ]

    // let BOQ = "Product,Quantity\nSmall KLT,"+boq.smallKLT+"\nMedium KLT,"+boq.mediumKLT+"\nBig KLT,"+boq.bigKLT+"\nFoldable KLT,"+boq.foldableKLT+"\nMetal Chassis,"+boq.chassis+"\nBots,"+boq.bots+"\nBalconies,"+boq.balcony+"\nMetal Cover Sheets,"+boq.cover+"\nTracks,"+boq.tracks+"\nCarriers,"+boq.carriers;

    var ws = fileSystem.createWriteStream("Bill Of Quantity.csv");
    fastcsv
        .write(boq, { headers: true })
        .on("finish", function() {
            res.send("<a href='/Bill Of Quantity.csv' download='Bill Of Quantity.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>");
        })
        .pipe(ws);
});

// Create the server and listen on port
http.createServer(app).listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});