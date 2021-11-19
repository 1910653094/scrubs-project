"use strict";

const query = require("../helper/query");

class ReturnHistory {
    constructor(id, return_date, quantity, id_history) {
        this.id = id;
        this.return_date = return_date;
        this.quantity = quantity;
        this.id_history = id_history
    };

    getReturnHistoryByHistory = async () => await query(
        'Get * return history by history id',
        'SELECT * FROM return_history WHERE id_history = $1',
        [this.id_history]
    );

    setBorrowedStateScrubsToFalse = async () => await query(
        'Set unborrowed state',
        `UPDATE scrub SET borrowed = false WHERE id_scrub IN
        (SELECT sc.id_scrub
        FROM scrub_borrow_history sbh, borrow_history bh, scrub sc
        WHERE sbh.id_scrub = sc.id_scrub AND sbh.id_history = bh.id_history
        AND bh.id_history = $1 AND sc.borrowed IS TRUE
        LIMIT $2);`,
        [this.id_history, this.quantity]
    );

    getNumberOfUnreturnedScrubsByHistory = async () => await query(
        `Count the number of unreturned scrubs`,
        `SELECT COUNT(sc.id_scrub)
        FROM scrub_borrow_history sbh, borrow_history bh, scrub sc
        WHERE sbh.id_scrub = sc.id_scrub AND sbh.id_history = bh.id_history
        AND bh.id_history = $1 AND sc.borrowed IS TRUE;`,
        [this.id_history]
    );

    setCompletelyReturnedTrue = async () => await query(
        `Set CompletelyReturned to true when all scrubs are returned`,
        `UPDATE public.borrow_history SET completely_returned = true WHERE id_history = $1`,
        [this.id_history]
    );

    insertReturn = async () => await query(
        'Insert a return',
        'INSERT INTO return_history(return_date, quantity, id_history) VALUES ($1, $2, $3);',
        [this.return_date, this.quantity, this.id_history]
    );


}

module.exports = ReturnHistory;
