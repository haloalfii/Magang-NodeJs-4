const express = require('express')
const selametan = require('./routes/selametan')
const chalk = require('chalk')
const time = require('./routes/time-conventer')
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    console.log(chalk.green('Akses ke App.Js'))
    res.send('Masuk ke App.js, silahkan pilih /selametan or /time')
})

app.use('/selametan', selametan);{
    console.log(chalk.green('Using Selametan'));
};
app.use('/time', time);{
    console.log(chalk.green('Using Time Conventer'))
}

app.listen(8000)

module.exports = app;