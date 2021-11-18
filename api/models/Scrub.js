"strict mode";

const { PreparedStatement } = require('pg-promise')();
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


  static getAllInformationBorrowedScrubItems(id_scrub) {
    return selectAllInformationBorrowedScrubItemsFromDb(id_scrub);
  }

  static reportScrubsItem(id_employee, id_scrub_type) {
    return reportScrubsIteminDb(id_employee,id_scrub_type);
  }

}

async function selectOverdueScrubsFromDb(id_employee) {
  const stmt = new PreparedStatement({
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
  const stmt = new PreparedStatement({
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

async function selectAllInformationBorrowedScrubItemsFromDb(id_history) {
  const stmt = new PreparedStatement({
    name: "Get Information about scrubs borrowed",
    text: `SELECT st.description, /*st.type, st.gender*/ st.size, bh.borrowed_date, bh.id_given_by, bh.quantity,bh.return_date
    FROM borrow_history bh, scrub_type st
    WHERE bh.id_scrub_type = st.id_scrub_type
    AND bh.id_history = $1;`,
    values: [id_history]
  });

  let result;
  await db.one(stmt).then(function (data) {
    result = data;
  });

  return result;
}

async function reportScrubsIteminDb(id_employee, id_scrub_type) {
  //TODO
  const stmt = new PreparedStatement({
    name: "Get Information about scrubs borrowed",
    text: `SELECT st.description, /*st.type, st.gender*/ st.size, bh.borrowed_date, bh.id_given_by ,bh.quantity,bh.return_date
    FROM borrow_history bh, scrub_type st
    WHERE bh.id_scrub_type = st.id_scrub_type
    AND bh.id_history = $1;`,
    values: [1]
  });

  let result;
  await db.one(stmt).then(function (data) {
    result = data;
  });

  return result;
}



module.exports = Scrub;
