const express = require('./node_modules/express');
const router = express.Router();
const chalk = require('./node_modules/chalk');
var moment = require('./node_modules/moment-timezone');

// --------------- MYSQL CONNECT DATABASE ---------------
var mysql = require('mysql')

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_time_conventer"
});

// --------------- MYSQL CONNECT DATABASE ---------------


router.get('/', function(req, res){
    var greet = 'Welcome to Time Convernter';
    let data = {
        greet,
    }
    res.json(data);
})

router.get('/add', function(req, res){
    console.log(chalk.green('Konversi Waktu'))
    let asal = req.query.asal;
    let konfersi = req.query.konfersi;
    let waktu = req.query.waktu;

    var input = moment.tz(req.query.waktu, req.query.asal);
    var output = input.clone().tz(req.query.konfersi).format("YYYY MM DD hh:mm a")

    var data = {
        asal,
        konfersi,
        waktu,
        output,
    }
    res.json(data);

    let sql = "INSERT INTO Time (from_tz, from_datetime, to_tz, to_datetime, insert_timestamp) VALUE ? ";
    let value = [[req.query.asal,req.query.waktu,req.query.konfersi,output,moment().format("DD/MM/YYYY HH:mm:ss")]]
    con.query(sql,[value],function(err,result){
        if(err) throw err;
        console.log("Insert Conventer Dari "+ req.query.asal + " Success");
    });
})

router.get('/history', function(req, res){
    con.query("SELECT * FROM Time", function(err,result,fields){
        if(err) throw err;
        res.json(result)
    });
})

router.get('/clear', function(req, res){
    console.log(chalk.red("Data sudah Di Bersihkan"))
    con.query("DELETE FROM Time", function(err, result, fields){
        if(err) throw err;
        res.json(result)
    });
})

module.exports = router;