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
  database: "streamshare",
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

app.post("/auth/login", (req, res) => {
  const { user_email, user_password } = req.body;
  let sqlGet = `SELECT USER_EMAIL, USER_PASSWORD FROM USER WHERE USER_EMAIL = '${req.body.user_email}' AND USER_PASSWORD = '${req.body.user_password}'`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("4")
    }
    else {
      console.log(rows);
      if (rows.length == 0)
        res.send("1");
      else
        res.send("0")
    }
  })
})

app.post("/auth/register", (req, res) => {
  const { user_email, user_password, user_name, age } = req.body;
  let sqlInsert = `INSERT INTO USER VALUES('${req.body.user_email}', '${req.body.user_password}', '${req.body.user_name}', ${req.body.age})`;
  connection.query(sqlInsert, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("4")
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/dash/profile", (req, res) => {
  const { user_email } = req.body;
  let sqlGet = `SELECT USER_EMAIL, USER_NAME, AGE FROM USER WHERE USER_EMAIL = '${req.body.user_email}'`
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("4")
    }
    else {
      console.log(rows);
      if (rows.length == 0)
        res.send("1");
      else
        res.send(rows);
    }
  })
})

app.get("/platform/names", (req, res) => {
  let sqlGet = 'SELECT DISTINCT PLATFORM_NAME FROM PLATFORM'
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("4")
    }
    else {
      console.log(rows);
      if (rows.length == 0)
        res.send("1");
      else
        res.send(rows);
    }
  })
})

app.post("/platform/plans", (req, res) => {
  const { platform_name } = req.body;
  let sqlGet = `SELECT PLAN_TYPE FROM PLATFORM WHERE PLATFORM_NAME = '${req.body.platform_name}'`
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("4")
    }
    else {
      console.log(rows);
      if (rows.length == 0)
        res.send("1");
      else
        res.send(rows);
    }
  })
})

app.post("/room/create", (req, res) => {
  const { room_name, admin_email,
    capacity, member_cnt, platform_name, plan_type,
    stream_account, stream_password } = req.body;
  let sqlInsert = `INSERT INTO ROOM VALUES('${req.body.room_name}', '${req.body.admin_email}', ${req.body.capacity}, ${req.body.member_cnt}, '${req.body.platform_name}', '${req.body.plan_type}', '${req.body.stream_account}', '${req.body.stream_password}')`;
  connection.query(sqlInsert, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
    }
    else {
      console.log(req.body);
    }
  })

  let sqlRoom = `INSERT INTO USER_ROOMS VALUES('${req.body.admin_email}', '${req.body.room_name}', 1);`;
  connection.query(sqlRoom, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("2")
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/room/available", (req, res) => {
  const { user_email } = req.body;
  let sqlGet = `SELECT ROOM_NAME, ADMIN_EMAIL, PLATFORM_NAME, PLAN_TYPE FROM ROOM`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App listening on port " + port);