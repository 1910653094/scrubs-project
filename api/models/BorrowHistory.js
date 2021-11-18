"use strict";

const query = require("../helper/query");

class BorrowHistory {
    constructor(id_history, quantity, borrowed_date, return_by, completely_returned) {
        this.id_history = id_history;
        this.quantity = quantity;
        this.borrowed_date = borrowed_date;
        this.return_by = return_by;
        this.completely_returned = completely_returned;
    };

    getAllBorrowHistory = async () => await query(
        "Get * From borrow_history",
        "SELECT * FROM borrow_history",
        []
    );

    getBorrowHistoryFromEmployee = async id => await query(
        'Get * borrow history from distinct employee',
        'SELECT quantity, bh.borrowed_date, return_by, completely_returned, id_scrub_type ' +
        'FROM scrub_borrow_history ' +
        'JOIN borrow_history bh USING(id_history) ' +
        'JOIN scrub USING(id_scrub) ' +
        'WHERE id_employee = $1 ' +
        'GROUP BY id_history, quantity, bh.borrowed_date, return_by, completely_returned, id_scrub_type',
        [id]
    );

    insertBorrowHistory = async () => await query(
        "Insert new borrowed history",
        'INSERT INTO borrow_history (quantity, borrowed_date, return_by, completely_returned) VALUES ($1, $2, $3, FALSE) RETURNING *',
        [this.quantity, this.borrowed_date, this.return_by]
    );
}

module.exports = BorrowHistory;
