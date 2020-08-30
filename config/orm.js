var connection = require("../config/connection.js");

// Quick function to return a string of n comma
// separated question marks for sql input
// for n >= 1
function printQuestionMarks(n) {
    var result = "";
    for (let i = 1; i < n; i++) {
        result += ",?";
    }
    result = result.slice(1)
    return result;
}


// Function to convert object key/value pairs into
// SQL syntax for updating and creating
function objToSQL(obj) {
    var a = [];
    for (let key in obj) {
        let val = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof val === "string" &&
                val.indexOf(" ") >= 0) {
                val = "'" + val + "'";
            }
            a.push(key + "=" + val);
        }
    }
    return a.toString();

}

function all(tableInput, cb) {
    var qString = "SELECT * FROM " + tableInput + ";";
    connection.query(qString, (err, res) => {
        if (err) console.log(err);
        cb(res);
    })
}

function create(table, cols, vals, cb) {
    let qString = "INSERT INTO" + table + " (";
    qString += cols.toString() + ") VALUES ("; 
    qString += printQuestionMarks(vals.length) + ") ";
    
    console.log(qString);

    connection.query(qString, vals, (err, res) => {
        if (err) throw err;
        cb(res);
    })

}

function update(table, objColVals, condition, cb) {
    var qString = "UPDATE " + table + " SET ";
    qString += objToSQL(objColVals) + " WHERE " + condition;

    console.log(qString);

    connection.query(qString, (err, res) => {
        if (err) throw err;
        cb(res);
    })
}



const orm = { all: all, create: create, update: update };
module.exports = orm;