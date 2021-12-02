"use strict";

const BorrowHistory = require("./BorrowHistory");
const query = require("../helper/query");

class Scrub {
  constructor(id_scrub, borrowed, borrowed_date, return_date, id_scrub_type) {
    this.id_scrub = id_scrub;
    this.borrowed = borrowed;
    this.borrowed_date = borrowed_date;
    this.return_date = return_date;
    this.id_scrub_type = id_scrub_type;
  };

  // function to get all scrubs which are neither borrowed nor reported
  getAllFreeScrubs = async () => await query(
    'Get * free scrubs',
    'SELECT * FROM scrub WHERE borrowed IS FALSE AND id_scrub NOT IN ( SELECT id_scrub FROM report );',
    []
  );

  getAllOverdueScrubs = async () => query(
      'Get * overdue scrubs',
      'SELECT email, "name", return_date, description, count(id_scrub_type) FROM scrub ' +
      'JOIN scrub_type USING(id_scrub_type)' +
      'JOIN scrub_borrow_history USING(id_scrub)' +
      'JOIN borrow_history USING(id_history) ' +
      'JOIN employee USING(id_employee) ' +
      'WHERE borrowed IS TRUE AND return_date < NOW() AND id_scrub NOT IN ( SELECT id_scrub FROM report ) ' +
      'GROUP BY id_scrub_type, email, "name", return_date, description',
      []
  );

  // function to get all scrubs that are overdue (filtered by one employee)
  getAllOverdueScrubsByEmployee = async id_employee => await query(
    'Get * overdue scrubs by distinct employee',
    'SELECT id_scrub_type, scrub.borrowed_date, return_date FROM scrub' +
      'JOIN scrub_borrow_history USING(id_scrub)' +
      'JOIN borrow_history USING(id_history) ' +
      'WHERE borrowed IS TRUE AND return_date < NOW() ' +
      'AND id_scrub NOT IN ( SELECT id_scrub FROM report ) AND id_employee = $1;',
    [id_employee]
  )



  // function to get all scrubs that are currently borrowed (filtered by one employee)
  getAllCurrentlyBorrowedScrubsByEmployee = async id_employee => await query(
    'Get * borrowed scrubs by distinct employee',
    'SELECT id_scrub_type, scrub.borrowed_date, return_date FROM scrub ' +
      'JOIN scrub_borrow_history USING(id_scrub)' +
      'JOIN borrow_history USING(id_history) ' +
      'WHERE borrowed IS TRUE ' +
      'AND id_scrub NOT IN ( SELECT id_scrub FROM report ) AND id_employee = $1;',
    [id_employee]
  )

  // function to get details about borrowed scrubs
  getDetailsBorrowedScrubItem = async (id_history) => await query(
    'Get * details borrowed scrub item',
    `SELECT DISTINCT st.description, st.gender, st.size, bh.borrowed_date, bh.id_given_by, bh.quantity, bh.return_by, bh.id_history
      FROM scrub_type st, scrub sc, borrow_history bh, scrub_borrow_history sbh
      WHERE sbh.id_scrub = sc.id_scrub AND sbh.id_history = bh.id_history AND sc.id_scrub_type = st.id_scrub_type
      AND bh.id_history = $1;`,
    [id_history]
  )

  // function to get scrub borrowed from an id_history with a limit of rows and not reported yet
  getScrubUnreportedfromHistoryWithLimit = async (id_history, quantity) => await query(
    'Get scrub borrowed from id history with limit',
    `SELECT sc.id_scrub
      FROM scrub_borrow_history sbh, borrow_history bh, scrub sc
      WHERE sbh.id_scrub = sc.id_scrub AND sbh.id_history = bh.id_history
      AND bh.id_history = $1 AND sc.borrowed IS TRUE 
      AND sc.id_scrub NOT IN (SELECT r.id_scrub FROM report r)
      LIMIT $2;`,
    [id_history, quantity]
  )

  // function to borrow an amount of scrubs with on scrub type
  employeeBorrowsScrubs = async (amount, by_employee, given_by) => {
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
      .map(s => new Scrub(s.id_scrub, s.borrowed, s.borrowed_date, s.return_date, s.id_scrub_type))
      .filter(s => s.id_scrub_type === this.id_scrub_type);
    const willBeBorrowedScrubs = scrubs.slice(0, amount);

    await willBeBorrowedScrubs.every(async scrub => {
      let res = await query(
        'Update specific scrub to be borrowed',
        'UPDATE scrub ' +
        'SET borrowed = true, borrowed_date = $1, return_date = $2 WHERE id_scrub = $3',
        [this.borrowed_date, this.return_date, scrub.id_scrub]
      );
      if (res.status !== 200) {
        return false;
      }
    });

    return await new BorrowHistory(
        null, amount, this.borrowed_date, this.return_date, false, by_employee, given_by
    ).insertBorrowHistory();
  };
}


module.exports = Scrub;
