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

module.exports = Scrub;
