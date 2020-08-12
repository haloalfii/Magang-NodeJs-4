const express = require('express');
const router = express.Router();
const chalk = require('chalk');
var moment = require('moment-timezone');

// --------------- MYSQL CONNECT DATABASE ---------------

const mysql = require('mysql');
var connect = require('../DB');

// --------------- MYSQL CONNECT DATABASE ---------------


router.get('/', function(req, res){
    var greet = 'Welcome to Time Convernter';
    let data = {
        greet,
    }
    res.json(data);
})


router.get('/add', function(req, res, con){
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

    let sql = "INSERT INTO Time (from_tz, from_datetime, to_tz, to_datetime, insert_timestamp) VALUE ? ";
    let value = [[req.query.asal,req.query.waktu,req.query.konfersi,output,moment().format("DD/MM/YYYY HH:mm:ss")]]
    connect.query(sql,[value],function(err,result){
        if(err) throw err;
        console.log("Insert Conventer Dari "+ req.query.asal + " Success");
    });
    res.json(data);
})

router.get('/history', function(req, res, con){
    connect.query("SELECT * FROM Time", function(err,result,fields){
        if(err) throw err;
        res.json(result)
    });
})

router.get('/clear', function(req, res, con){
    console.log(chalk.red("Data sudah Di Bersihkan"))
    connect.query("DELETE FROM Time", function(err, result, fields){
        if(err) throw err;
        res.json(result)
    });
})

module.exports = router;