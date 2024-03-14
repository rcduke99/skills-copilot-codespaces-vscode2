//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Create connection to the database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comments',
  port: 3306
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

//Create comments table
app.get('/create', (req, res) => {
  let sql = 'CREATE TABLE comments (id int AUTO_INCREMENT, author VARCHAR(255), comment TEXT, PRIMARY KEY(id))';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Comments table created');
  });
});

//Insert comment
app.post('/comment', (req, res) => {
  let comment = req.body;
  let sql = 'INSERT INTO comments SET ?';
  connection.query(sql, comment, (err, result) => {
    if (err) throw err;
    res.send('Comment added');
  });
});

//Get all comments
app.get('/comments', (req, res) => {
  let sql = 'SELECT * FROM comments';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get comment by id
app.get('/comment/:id', (req, res) => {
  let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Update comment by id
app.put('/comment/:id', (req, res) => {
  let sql = `UPDATE comments SET comment = '${req.body.comment}' WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Comment updated');
  });
});

//Delete comment by id
app.delete('/comment/:id', (req, res) => {
  let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Comment deleted
