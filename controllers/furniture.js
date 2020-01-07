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
    let sql = 'INSERT INTO `meble` (`ID`, `category_ID`, `name`, `description`, `width`, `height`, `depth`, `doors`, `drawer`, `format`, `tag`) VALUES ?'
    //INSERT INTO `meble` (`ID`, `category_ID`, `name`, `description`, `width`, `height`, `depth`, `doors`, `drawer`, `format`, `tag`) VALUES ('', '1', 'Biurko dziecięce', 'Dla najmłodszych', '10', '20', '30', '0', '1', '', 'Szkoła');
    mysqlConnection.query(sql, [furniture], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
})

router.delete("/:id", (req, res) => {
    let description = req.params.id;
    let sql = 'DELETE FROM `meble` WHERE `meble`.`ID` =?';
    mysqlConnection.query(sql, [description], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


module.exports = router;