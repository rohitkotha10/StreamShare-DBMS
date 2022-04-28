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
  let sqlGet = `SELECT USER_EMAIL, USER_PASSWORD FROM USER WHERE USER_EMAIL = '${req.body.user_email}' 
  AND USER_PASSWORD = '${req.body.user_password}'`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("4")
      return;
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
      return;
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
      return;
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
      return;
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
      return;
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
  let sqlInsert = `INSERT INTO ROOM VALUES('${req.body.room_name}', '${req.body.admin_email}', 
   ${req.body.capacity}, ${req.body.member_cnt}, 
  '${req.body.platform_name}', '${req.body.plan_type}', 
  '${req.body.stream_account}', '${req.body.stream_password}')`;
  connection.query(sqlInsert, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
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
      return;
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/room/available", (req, res) => {
  const { user_email } = req.body;
  let sqlGet = `SELECT DISTINCT ROOM.ROOM_NAME, ROOM.ADMIN_EMAIL, ROOM.PLATFORM_NAME, ROOM.PLAN_TYPE 
  FROM ROOM, USER_ROOMS WHERE   MEMBER_CNT < CAPACITY AND ROOM.ROOM_NAME NOT IN 
  (SELECT ROOM_NAME FROM USER_ROOMS WHERE USER_EMAIL = '${req.body.user_email}')`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/request/send", (req, res) => {
  const { user_email, room_name, message, user_type } = req.body;
  let sqlInsert = `INSERT INTO REQUESTS VALUES('${req.body.user_email}', 
  '${req.body.room_name}', '${req.body.message}', ${req.body.user_type})`;
  connection.query(sqlInsert, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/room/admin", (req, res) => {
  const { user_email } = req.body;
  let sqlGet = `SELECT * FROM ROOM WHERE ADMIN_EMAIL = '${req.body.user_email}'`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/room/user", (req, res) => {
  const { user_email } = req.body;
  let sqlGet = `SELECT DISTINCT ROOM.ROOM_NAME, ADMIN_EMAIL, PLATFORM_NAME, PLAN_TYPE, 
  STREAM_ACCOUNT, STREAM_PASSWORD FROM ROOM, USER_ROOMS 
  WHERE ROOM.ROOM_NAME = USER_ROOMS.ROOM_NAME AND 
  USER_EMAIL = '${req.body.user_email}' AND 
  ADMIN_EMAIL != '${req.body.user_email}'`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/room/members", (req, res) => {
  const { room_name } = req.body;
  let sqlGet = `SELECT DISTINCT USER.USER_EMAIL, USER.USER_NAME, USER.AGE, USER_TYPE 
  FROM USER, USER_ROOMS WHERE ROOM_NAME = '${req.body.room_name}' 
  AND USER_ROOMS.USER_EMAIL = USER.USER_EMAIL`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/room/leave", (req, res) => {
  const { user_email, room_name } = req.body;
  let sqlDel = `DELETE FROM USER_ROOMS WHERE ROOM_NAME = '${req.body.room_name}' 
  AND USER_EMAIL = '${req.body.user_email}'`;
  connection.query(sqlDel, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
  })
  let cntupdate = `UPDATE ROOM SET MEMBER_CNT = MEMBER_CNT - 1 
  WHERE ROOM_NAME = '${req.body.room_name}'`
  connection.query(cntupdate, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/room/delete", (req, res) => {
  const { user_email, room_name } = req.body;
  let sqlDel = `DELETE FROM ROOM WHERE ROOM_NAME = '${req.body.room_name}'`;
  connection.query(sqlDel, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/room/removeuser", (req, res) => {
  const { user_email, room_name } = req.body;
  let sqlDel = `DELETE FROM USER_ROOMS WHERE USER_EMAIL = '${req.body.user_email}' 
  AND ROOM_NAME = '${req.body.room_name}'`;
  connection.query(sqlDel, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
  })

  let cntupdate = `UPDATE ROOM SET MEMBER_CNT = MEMBER_CNT - 1 
  WHERE ROOM_NAME = '${req.body.room_name}'`
  connection.query(cntupdate, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(req.body);
      res.send("0");
    }
  })
})

app.post("/room/payment", (req, res) => {
  const { room_name } = req.body;
  let price = `SELECT PLAN_PRICE FROM ROOM, PLATFORM WHERE ROOM_NAME = '${req.body.room_name}' 
  AND ROOM.PLATFORM_NAME = PLATFORM.PLATFORM_NAME AND ROOM.PLAN_TYPE = PLATFORM.PLAN_TYPE`;
  connection.query(price, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})
app.post("/room/paymembers", (req, res) => {
  const { room_name } = req.body;
  let number = `SELECT COUNT(*) AS CNT FROM USER_ROOMS 
  WHERE ROOM_NAME = '${req.body.room_name}' AND 
  USER_TYPE = 1`;
  connection.query(number, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/request/view", (req, res) => {
  const { room_name } = req.body;
  let sqlGet = `SELECT USER_EMAIL, MESSAGE, USER_TYPE
  FROM REQUESTS WHERE ROOM_NAME = '${req.body.room_name}'`;
  connection.query(sqlGet, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
    else {
      console.log(rows);
      res.send(rows);
    }
  })
})

app.post("/request/response", (req, res) => {
  const { user_email, room_name, user_type, response } = req.body;
  let del = `DELETE FROM REQUESTS WHERE
  USER_EMAIL = '${req.body.user_email}' AND ROOM_NAME = '${req.body.room_name}'`;
  connection.query(del, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
  })
  if (req.body.response === 0) {
    res.send("0");
    return;
  }
  let upd1 = `INSERT INTO USER_ROOMS 
  VALUES('${req.body.user_email}', '${req.body.room_name}', ${req.body.user_type});`
  connection.query(upd1, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
  })
  let upd2 = `UPDATE ROOM SET MEMBER_CNT = MEMBER_CNT + 1 
  WHERE ROOM_NAME = '${req.body.room_name}'`;
  connection.query(upd2, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.send("3")
      return;
    }
  })
  res.send("0");
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App listening on port " + port);