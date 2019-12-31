const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");

router.get("/", (req, res) => {
    mysqlConnection.query('SELECT *, c.category FROM meble JOIN kategorie c ON meble.category_ID = c.category_ID', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

router.post("/", (req, res, next) => {
    let furniture = req.body;
    let sql = "INSERT INTO meble VALUES ?"
    mysqlConnection.query(sql, [furniture], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})


module.exports = router;