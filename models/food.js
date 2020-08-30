var orm = require("../config/orm.js");

function all(cb) {
    orm.all("food", (res) => cb(res));
}

function create(cols, vals, cb) {
    orm.create("food", cols, vals, (res) => cb(res));
}

function update(objColVals, condition, cb) {
    orm.update("food", objColVals, condition, (res) => cb(res))
}

module.exports = { all: all, update: update, create: create }