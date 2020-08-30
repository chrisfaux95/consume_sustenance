var express = require("express");

var router = express.Router();

var food = require("../models/cat.js");

router.get("/", (req, res) => {
    food.all((data) => {
        var obj = { food: data };
        console.log(obj);
        res.render("index", obj);
    });
});

router.post("/api/food", (req, res) => {
    food.create(["name", "eaten"], [req.body.name, req.body.eaten], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/food/:id", (req, res) => {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    food.update({ eaten: req.body.eaten }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;