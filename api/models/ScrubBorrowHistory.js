"use strict";

const query = require("../helper/query");

class ScrubBorrowHistory {
    constructor(id, id_scrub, id_history) {
        this.id = id;
        this.id_scrub = id_scrub;
        this.id_history = id_history;
    };
}

module.exports = ScrubBorrowHistory;
