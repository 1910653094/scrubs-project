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
        'INSERT INTO scrub_borrow_history(returned, id_scrub, id_history) VALUES(FALSE, $1, $2) RETURNING *',
        [this.id_scrub, this.id_history]
    );

    returnScrub = async () => await query(
        'Set returned to true',
        'UPDATE scrub_borrow_history SET returned = TRUE, returned_date = NOW() WHERE id_history = $1 AND id_scrub = $2;',
        [this.id_history, this.id_scrub]
    );
}

module.exports = ScrubBorrowHistory;
