var mysql = require('mysql');

var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_time_conventer"
});

module.exports = connect;



// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE db_time_conventer", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Connected!");
// 	var sql = "CREATE TABLE Time (id INT AUTO_INCREMENT PRIMARY KEY, from_tz VARCHAR(30), from_datetime VARCHAR(30), to_tz VARCHAR(30), to_datetime VARCHAR(30), insert_timestamp VARCHAR(30))";
// 	con.query(sql, function (err, result) {
// 	  if (err) throw err;
// 	  console.log("Table created");
// 	});
//   });