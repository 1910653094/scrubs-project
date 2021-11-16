// "strict mode";
"use strict";

const { PreparedStatement: PS } = require('pg-promise')();
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
    return selectOverdueScrubsFromDb(id_employee);
  }

  static getScrubsCurrentlyBorrowedWithIdEmployee(id_employee) {
    return selectScrubsCurrentlyBorrowedFromDb(id_employee);
  }

  borrowScrub = async () => {
    const stmt = new PS({
      name: "Get * Employees",
      text: 'INSERT INTO employee (email, password, "name", profession, gender)',
      values: [email, name, profession, gender]
    });

    let results;
    await db.any(stmt)
        .then(data => results = data)
        .catch(err => {
          console.log(err);
        });
    return results;
  }

}

async function selectOverdueScrubsFromDb(id_employee) {
  const stmt = new PS({
    name: "Get Personal Overdue Scrubs",
    text: `SELECT sc.id_scrub_type, sc.borrowed_date, sc.return_date 
    FROM scrub sc
    WHERE sc.return_date IS NULL AND sc.borrowed = 'true' 
    AND current_date - sc.borrowed_date > 7 AND sc.id_employee = $1;`,
    values: [id_employee]
  });

  let results;
  await db.any(stmt).then(function (data) {
    results = {
      scrubsOverdue: data,
      quantity: data.length
    }
  });

  return results;
}

async function selectScrubsCurrentlyBorrowedFromDb(id_employee) {
  const stmt = new PS({
    name: "Get Personal Scrubs Currently Borrowed",
    text: `SELECT sc.id_scrub_type, sc.borrowed_date, sc.return_date 
    FROM scrub sc 
    WHERE sc.borrowed = 'true' AND sc.return_date IS NULL AND sc.id_employee =$1;`,
    values: [id_employee]
  });

  let results;
  await db.any(stmt).then(function (data) {
    results = {
      scrubsCurrentlyBorrowed: data,
      quantity: data.length
    }
  });

  return results;
}


module.exports = Scrub;
