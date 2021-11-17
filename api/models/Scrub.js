// "strict mode";
"use strict";

const { PreparedStatement: PS } = require('pg-promise')();
const db = require('../helper/elephantSQL');
const BorrowHistory = require("./BorrowHistory");
const query = require("../helper/query");
 
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

  // function to get all scrubs which are neither borrowed nor reported
  getAllFreeScrubs = async () => await query(
        "Get * free scrubs",
        'SELECT * FROM scrub WHERE borrowed IS FALSE AND id_scrub NOT IN ( SELECT id_scrub FROM report );',
        []
    );

  // function to borrow an amount of scrubs with on scrub type
  borrowScrubs = async amount => {
    const allObj = await this.getAllFreeScrubs();
    if (allObj.status !== 200) {
      return allObj;
    }

    if (allObj.length < amount) {
      return {
        status: 400,
        response: "There are not enough free scrubs"
      };
    }

    const scrubs = allObj.response
        .map(s => new Scrub(s.id_scrub, s.borrowed, s.borrowed_date, s.return_date, s.id_scrub_type, s.id_employee))
        .filter(s => s.id_scrub_type === this.id_scrub_type);
    const willBeBorrowedScrubs = scrubs.slice(0, amount);

    await willBeBorrowedScrubs.every(async scrub => {
      let res = await query(
          "Update specific scrub to be borrowed",
          "UPDATE scrub SET borrowed = true, borrowed_date = $1, return_date = $2, id_employee = $3 WHERE id_scrub = $4",
          [this.borrowed_date, this.return_date, this.id_employee, scrub.id_scrub]
      );
      if (res.status !== 200) {
        return false;
      }
    });

    return await new BorrowHistory(
        null, amount, this.borrowed_date, this.return_date, false, this.id_scrub_type, this.id_employee
    ).insertBorrowHistory();
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
