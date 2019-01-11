var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/'));


app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

app.get('/testing', function (req, res) {
  fs.readFile(__dirname + '/static/data.json', {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      res.send(data)
    }
  })
});

app.get('/testing_1', function (req, res) {
  fs.readFile(__dirname + '/static/data_1.json', {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      res.send(data)
    }
  })
});

app.post('/testing', function (req, res) {
  fs.readFile(__dirname + '/static/data.json', {encoding: 'utf-8'}, function (err, buffer) {
    var data = JSON.parse(buffer);
    data = req.body;
    fs.writeFile(__dirname + '/static/data.json', JSON.stringify(data), function (err) {
      console.log(data);
      if (err) {
        console.error(err);
      } else {
        console.log('базы перезаписаны')
      }
    });
    res.send('POST на сервере')
  });
});
app.post('/testing_1', function (req, res) {
  fs.readFile(__dirname + '/static/data_1.json', {encoding: 'utf-8'}, function (err, buffer) {
    var data = JSON.parse(buffer);
    data = req.body;
    fs.writeFile(__dirname + '/static/data_1.json', JSON.stringify(data), function (err) {
      console.log(data);
      if (err) {
        console.error(err);
      } else {
        console.log('базы_1 перезаписаны')
      }
    });
    res.send('POST_1 на сервере')
  });
});

http.listen(5000, function () {
  console.log('Server running at port 5000');
});



