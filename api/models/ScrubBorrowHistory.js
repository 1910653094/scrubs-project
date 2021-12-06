"use strict";

const query = require("../helper/query");

class ScrubBorrowHistory {
    constructor(id, id_scrub, id_history) {
        this.id = id;
        this.id_scrub = id_scrub;
        this.id_history = id_history;
    };

    insertScrubBorrowHistory = async () => await query(
        'Insert new scrub borrowed history',
        'INSERT INTO scrub_borrow_history(id_scrub, id_history) VALUES($1, $2) RETURNING *',
        [this.id_scrub, this.id_history]
    );
}

module.exports = ScrubBorrowHistory;
