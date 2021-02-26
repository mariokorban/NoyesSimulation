const express = require('express');

const app = express();

const http = require('http');

const path = require('path');

const port = process.env.PORT || 3000


// Use the whole root as static files to be able to serve the html file and
// the build folder
app.use(express.static(path.join(__dirname, '/')));

// Send html on '/'path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, + '/index.html'));
})

// Send html on '/simulation'path
app.get('/simulation', (req, res) => {
    res.sendFile(__dirname+"/simulation.html");
})

// Create the server and listen on port
http.createServer(app).listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});