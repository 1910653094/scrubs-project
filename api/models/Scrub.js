"use strict";

const BorrowHistory = require("./BorrowHistory");
const query = require("../helper/query");

class Scrub {
  constructor(id_scrub, borrowed, borrowed_date, return_date, id_scrub_type, id_employee, id_given_by, id_room) {
    this.id_scrub = id_scrub;
    this.borrowed = borrowed;
    this.borrowed_date = borrowed_date;
    this.return_date = return_date;
    this.id_scrub_type = id_scrub_type;
    this.id_employee = id_employee;
    this.id_given_by = id_given_by;
    this.id_room = id_room;
  };

  // function to get all scrubs which are neither borrowed nor reported
  getAllFreeScrubs = async () => await query(
    'Get * free scrubs',
    'SELECT * FROM scrub WHERE borrowed IS FALSE AND id_scrub NOT IN ( SELECT id_scrub FROM report );',
    []
  );

  // function to get all scrubs that are overdue (filtered by one employee)
  getAllOverdueScrubsByEmployee = async () => await query(
      'Get * overdue scrubs by distinct employee',
      'SELECT id_scrub_type, borrowed_date, return_date FROM scrub WHERE borrowed IS TRUE AND return_date < NOW() ' +
      'AND id_scrub NOT IN ( SELECT id_scrub FROM report ) AND id_employee = $1;',
      [this.id_employee]
    )



  // function to get all scrubs that are currently borrowed (filtered by one employee)
  getAllCurrentlyBorrowedScrubsByEmployee = async () => await query(
    'Get * borrowed scrubs by distinct employee',
    'SELECT id_scrub_type, borrowed_date, return_date FROM scrub WHERE borrowed IS TRUE ' +
    'AND id_scrub NOT IN ( SELECT id_scrub FROM report ) AND id_employee = $1;',
    [this.id_employee]
  )

  // function to get all details about an borrowed scrub item (filtered by a scrub)
  getAllDetailsBorrowedScrubItem = async () => await query(
    'Get * details borrowed scrub item',
    `SELECT DISTINCT st.description, st.gender, st.size, bh.borrowed_date, sc.id_given_by, bh.quantity, bh.return_by, bh.id_history
      FROM scrub_type st, scrub sc, borrow_history bh, scrub_borrow_history sbh
      WHERE sbh.id_scrub = sc.id_scrub AND sbh.id_history = bh.id_history AND sc.id_scrub_type = st.id_scrub_type
      AND bh.id_history IN
      (SELECT bh2.id_history
      FROM borrow_history bh2, scrub_borrow_history sbh2
      WHERE sbh2.id_history = bh2.id_history AND sbh2.id_scrub = $1);`,
    [this.id_scrub]
  )

  // function to borrow an amount of scrubs with on scrub type
  employeeBorrowsScrubs = async amount => {
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
        'Update specific scrub to be borrowed',
        'UPDATE scrub ' +
        'SET borrowed = true, borrowed_date = $1, return_date = $2, id_employee = $3, id_given_by = $4 ' +
        'WHERE id_scrub = $5',
        [this.borrowed_date, this.return_date, this.id_employee, this.id_given_by, scrub.id_scrub]
      );
      if (res.status !== 200) {
        return false;
      }
    });

    return await new BorrowHistory(null, amount, this.borrowed_date, this.return_date, false)
      .insertBorrowHistory();
  };
}
/*
async function selectAllInformationBorrowedScrubItemsFromDb(id_history) {
  const stmt = new PreparedStatement({
    name: "Get Information about scrubs borrowed",
    text: `SELECT st.description,  st.size, bh.borrowed_date, bh.id_given_by, bh.quantity,bh.return_date
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
    text: `SELECT st.description,  st.size, bh.borrowed_date, bh.id_given_by ,bh.quantity,bh.return_date
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
*/



module.exports = Scrub;
