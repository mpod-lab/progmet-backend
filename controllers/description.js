const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");

router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM opis', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

router.put("/:id", (req, res, next) => {
    let description = req.body;
    let sql = "UPDATE `opis` SET `description` = ? WHERE `opis`.`id` = 1;"
    mysqlConnection.query(sql, [description], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})

module.exports = router;