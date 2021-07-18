// Express Js - https://expressjs.com/
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('assets'));
app.use(express.static('js'));
app.use(express.static('music'));

// Index Route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Game Route
app.get('/game', function(req, res) {
  res.sendFile(path.join(__dirname, '/game.html'));
});

app.listen(port);
console.log('Server started at http://localhost/:' + port);