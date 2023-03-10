const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'contact'
});

connection.connect(function(err){
    (err) ? console.log(err) : console.log(connection);
});

app.get('/api/user', (req, res) => {
    var sql = "SELECT * FROM user ORDER BY id DESC";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({user: results});
    });
});

app.post('/api/add', function(req, res) {
    var sql = "INSERT "
        + "INTO user(name,phone) "
        + "VALUES('"
        +   req.body.name+ "','"
        +   req.body.phone+"')";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({user: results});
    });
});

app.post('/api/update', function(req, res) {
    var sql = "UPDATE user SET "
        + "name='"+req.body.name+"',"
        + "phone='"+req.body.phone+"'"
        + "WHERE id='"+req.body.id+"'";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({user: results});
    });
});

app.post('/api/delete', function(req, res) {
    var sql = "DELETE FROM user "
        + "WHERE id='"+req.body.id+"'";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.json({user: results});
    });
});
app.listen(4000, () => console.log('App listening on port 4000'));