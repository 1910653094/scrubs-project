//"strict mode";
"use strict";

const { PreparedStatement: PS } = require('pg-promise')();
const db = require('../helper/elephantSQL');
const query = require("../helper/query");

class BorrowHistory {
    constructor(id_history, quantity, borrowed_date, return_date, returned, id_scrub_type, id_employee) {
        this.id_history = id_history;
        this.quantity = quantity;
        this.borrowed_date = borrowed_date;
        this.return_date = return_date;
        this.returned = returned;
        this.id_scrub_type = id_scrub_type;
        this.id_employee = id_employee;
    }

    static getHistoryWithIdEmployee(id_employee) {
        return selectHistoryFromDb(id_employee);
    }

    insertBorrowHistory = async () => await query(
        "Insert new borrowed history",
        'INSERT INTO borrow_history (quantity, borrowed_date, return_date, returned, id_scrub_type, id_employee) VALUES ($1, $2, $3, FALSE, $4, $5) RETURNING *',
        [this.quantity, this.borrowed_date, this.return_date, this.id_scrub_type, this.id_employee]
    );
}

async function selectHistoryFromDb(id_employee) {
    const stmt = new PS({
        name: "Get History",
        text: `SELECT bh.id_scrub_type, bh.borrowed_date, bh.return_date, bh.quantity 
      FROM borrow_history bh 
      WHERE bh.id_employee = $1`,
        values: [3]
    });

    let results;
    await db.any(stmt).then(function (data) {
        results = data;
    });
    return results;
}

module.exports = BorrowHistory;
