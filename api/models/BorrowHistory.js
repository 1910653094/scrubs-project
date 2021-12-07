"use strict";

const query = require("../helper/query");

class BorrowHistory {
    constructor(id_history, quantity, borrowed_date, return_by, completely_returned, id_employee, id_given_by, id_room) {
        this.id_history = id_history;
        this.quantity = quantity;
        this.borrowed_date = borrowed_date;
        this.return_by = return_by;
        this.completely_returned = completely_returned;
        this.id_employee = id_employee;
        this.id_given_by = id_given_by;
        this.id_room = id_room;
    };

    getAllBorrowHistory = async () => await query(
        "Get * From borrow_history",
        "SELECT * FROM borrow_history",
        []
    );


    getBorrowHistoryFromEmployee = async id => {
        let resObj = await query(
            'Get * borrow history from distinct employee',
            'SELECT id_history, quantity, bh.borrowed_date, return_by, completely_returned, ' +
            'description, size, color, scrub_type.gender, name ' +
            'FROM scrub_borrow_history ' +
            'JOIN borrow_history bh USING(id_history) ' +
            'JOIN scrub USING(id_scrub) ' +
            'JOIN scrub_type USING(id_scrub_type)' +
            'JOIN employee giver ON giver.id_employee = id_given_by ' +
            'WHERE bh.id_employee = $1 ' +
            'GROUP BY id_history, quantity, bh.borrowed_date, return_by, completely_returned, ' +
            'description, size, color, scrub_type.gender, name',
            [id]
        );

        if (resObj.status !== 200) {
            return resObj;
        }

        let history = [];

        await Promise.all(resObj.response.map(async h => {
            let res = await this.getReportedFromBorrowHistory(h.id_history);
            if (res.status !== 200) {
                return res;
            }

            let reportedSum = res.response[0].reported;
            h.quantity -= reportedSum;

            res = await this.getReturnHistoryFromBorrowHistory(h.id_history);
            if (res.status !== 200) {
                return res;
            }
            res.response.forEach(returnHistory => {
                const qty = returnHistory.quantity;
                h.quantity -= qty;
                returnHistory.status = "returned";
                history.push(returnHistory);
            });

            if (h.quantity > 0) {
                return h;
            }
        })).then(res => resObj.response = res.concat(history));

        return resObj;
    };

    getReportedFromBorrowHistory = async id => await query(
        'Get sum of reported scrubs of distinct borrow history',
        'SELECT COUNT(*) AS reported FROM borrow_history ' +
        'JOIN scrub_borrow_history USING(id_history) ' +
        'JOIN report USING(id_scrub) ' +
        'WHERE id_history = $1;',
        [id]
    );

    getReturnHistoryFromBorrowHistory = async id => await query(
        'Get * return history from distinct borrow history',
        'SELECT id_history, count(id_scrub) as quantity, bh.borrowed_date, return_by, completely_returned, ' +
        'description, size, color, scrub_type.gender, name ' +
        'FROM scrub_borrow_history sbh ' +
        'JOIN borrow_history bh USING(id_history) ' +
        'JOIN scrub USING(id_scrub) ' +
        'JOIN scrub_type USING(id_scrub_type)' +
        'JOIN employee giver ON giver.id_employee = id_given_by ' +
        'WHERE returned = TRUE AND sbh.id_history = $1 ' +
        'GROUP BY id_history, bh.borrowed_date, return_by, completely_returned, ' +
        'description, size, color, scrub_type.gender, name',
        [id]
    );

    insertBorrowHistory = async () => await query(
        "Insert new borrowed history",
        'INSERT INTO borrow_history (quantity, borrowed_date, return_by, completely_returned, id_employee, id_given_by, id_room) ' +
        'VALUES ($1, $2, $3, FALSE, $4, $5, $6) RETURNING *',
        [this.quantity, this.borrowed_date, this.return_by, this.id_employee, this.id_given_by, this.id_room]
    );
}

module.exports = BorrowHistory;
