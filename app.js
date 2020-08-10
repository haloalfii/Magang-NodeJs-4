const express = require('express')
const selametan = require('./routes/selametan')
const chalk = require('chalk')
const time = require('./routes/time-conventer')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res){
    console.log(chalk.green('Akses ke App.Js'))
    res.send('Masuk ke App.js, silahkan pilih /selametan or /time-conventer')
})

app.use('/selametan', selametan);{
    console.log(chalk.green('Using Selametan'));
};
app.use('/time', time);

app.listen(8000)

module.exports = app;