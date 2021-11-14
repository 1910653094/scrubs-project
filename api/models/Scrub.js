"strict mode";

const db = require('../helper/elephantSQL');

class Scrub {
  constructor(id_scrub, borrowed, borrowed_date, return_date, id_scrub_type, id_employee) {
    this.id_scrub = id_scrub;
    this.borrowed = borrowed;
    this.borrowed_date = borrowed_date;
    this.return_date = return_date;
    this.id_scrub_type = id_scrub_type;
    this.id_employee = id_employee;
  }

  static getOverdueScrubsWithIdEmployee(id_employee) {
    return getOverdueScrubsFromDb(id_employee);
  }

  static getScrubsCurrentlyBorrowedWithIdEmployee(id_employee) {
    return getScrubsCurrentlyBorrowedFromDb(id_employee);
  }


}

async function getOverdueScrubsFromDb(id_employee) {
  let results = await db.query(
    `SELECT sc.id_scrub_type, sc.borrowed_date, sc.return_date 
      FROM scrub sc
      WHERE sc.return_date IS NULL AND sc.borrowed = 'true' 
      AND current_date - sc.borrowed_date > 7 AND sc.id_employee = ${id_employee};`
  );

  results = {
    scrubsOverdue: results.rows,
    quantity: results.rows.length
  }
  return results;
}

async function getScrubsCurrentlyBorrowedFromDb(id_employee) {
  let results = await db.query(
    `SELECT sc.id_scrub_type, sc.borrowed_date, sc.return_date 
      FROM scrub sc 
      WHERE sc.borrowed = 'true' AND sc.return_date IS NULL AND sc.id_employee =${id_employee};`
  );

  results = {
    scrubsCurrentlyBorrowed: results.rows,
    quantity: results.rows.length
  }
  return results;
}


module.exports = Scrub;
