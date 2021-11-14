"strict mode";

const db = require('../helper/elephantSQL');

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
        return getHistoryFromDb(id_employee);
    }
}

async function getHistoryFromDb(id_employee) {
    let results = await db.query(
        `SELECT bh.id_scrub_type, bh.borrowed_date, bh.return_date, bh.quantity 
        FROM borrow_history bh 
        WHERE bh.id_employee = ${id_employee}`
    );
    return results.rows;
}

module.exports = BorrowHistory;
