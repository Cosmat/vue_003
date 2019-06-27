var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var fs = require('fs');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/src/assets/'))

app.get('/', function (req, res) {
    res.sendFile(__dirname/  + '/dist/index.html');
  });

  app.get('/take_data', function (req, res) {
    fs.readFile(__dirname + '/src/assets/data.json', {encoding: 'utf-8'}, function (err, data) {
    if (err) throw new Error ( err)
    // data = JSON.parse(data)
    res.status(200).send(data)
    })
  });

  app.get('/take_data_1', function (req, res) {
    fs.readFile(__dirname + '/src/assets/data_1.json', {encoding: 'utf-8'}, function (err, data) {
    if (err) throw new Error ( err)
    // data = JSON.parse(data)
    res.status(200).send(data)
    })
  });

  app.post('/write_mass_off', (req, res) => {
    var data = req.body
    console.log(data)
    fs.writeFile(__dirname + '/src/assets/data.json', JSON.stringify(data), (err) => {
      if (err) throw new Error (err)
    })
    res.status(200).send('write_mass_off')
  })

  app.post('/write_mass_on', (req, res) => {
    var data = req.body
    console.log(data)
    fs.writeFile(__dirname + '/src/assets/data_1.json', JSON.stringify(data), (err) => {
      if (err) throw new Error ( err)
    })
    res.status(200).send('write_mass_on')
  })

  app.post('/write_log_on', (req, res) => {
    var data = req.body
    fs.appendFile(__dirname + '/src/assets/logs.txt', `\n` + 'Первый пролет связь установлена в: ' + data.t_ws_1_on, (err) => {
      if (err) throw new Error ( err)
    })
    res.status(200).send('write_log_on')
  })

  app.post('/write_log_off', (req, res) => {
    var data = req.body
    fs.appendFile(__dirname + '/src/assets/logs.txt', `\n` + 'Первый пролет связь потеряна в: ' + data.t_ws_1_off, (err) => {
      if (err) throw new Error ( err)
    })
    res.status(200).send('write_log_off')
  })

  
http.listen(5000, () => {
  console.log('Server running at port 5000');
});
  