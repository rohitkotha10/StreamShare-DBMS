const express = require('express');
const mysql = require('mysql');

const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "express_yt",
  port: "3306"
})

connection.connect((err) => {
  if (err)
    throw err
  else
    console.log("connection success");
})

app.get("/", (req, res) => {
  res.send("This is backend running on express");
})

app.get("/students/get", (req, res) => {
  const sqlGet = "SELECT * FROM STUDENT";
  connection.query(sqlGet, (err, rows) => {
    if (err)
      throw err
    else {
      console.log("GOOD GET");
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/students/add", (req, res) => {
  const { SID, SNAME } = req.body;
  const sqlInsert = 'INSERT INTO STUDENT VALUES(?, ?)'
  connection.query(sqlInsert, [SID, SNAME], (err, result) => {
    if (err)
      throw err
    else {
      console.log(req.body);
    }
  })
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App listening on port " + port);