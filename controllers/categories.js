const express = require('express');
const router = express.Router();
const mysqlConnection = require("../connection");

router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM kategorie', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

router.post("/", (req, res) => {
    let description = req.body;
    let sql = 'INSERT INTO `kategorie` (`category_ID`, `category`) VALUES (NULL, ?)'
    mysqlConnection.query(sql, [description.category], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

router.put("/:id", (req, res) => {
    let description = req.body;
    let category_name = description.category;
    let sql = "UPDATE`kategorie` SET `category` = ? WHERE`kategorie`.`category_ID` = ?";
    mysqlConnection.query(sql, [category_name, description.category_ID], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


router.delete("/:id", (req, res) => {
    let description = req.params.id;
    let sql = 'DELETE FROM `kategorie` WHERE `kategorie`.`category_ID` =?';
    mysqlConnection.query(sql, [description], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            new Error("Nope");
    })
});

module.exports = router;