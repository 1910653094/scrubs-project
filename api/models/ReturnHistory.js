"use strict";

const query = require("../helper/query");

class ReturnHistory {
    constructor(id, name, return_date, quantity, id_history) {
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
}

module.exports = ReturnHistory;
