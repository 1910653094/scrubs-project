"use strict";

/*const { PreparedStatement: PS } = require('pg-promise')();
const db = require('../helper/elephantSQL');*/
const query = require("../helper/query");

class Report {
    constructor(id_report, report_type, description, id_scrub, id_reported_by) {
        this.id_report = id_report;
        this.report_type = report_type;
        this.description = description;
        this.id_scrub = id_scrub;
        this.id_reported_by = id_reported_by;
    };

    insertReport = async () => await query(
        'Insert a report',
        'INSERT INTO report(report_type, description, id_scrub, id_reported_by) VALUES ($1, $2, $3, $4)',
        [this.report_type, this.description, this.id_scrub, this.id_reported_by]
    );

    /*static reportItem(report_type, description, id_scrub, id_employee) {
        insertReportinDb(report_type, description, id_scrub, id_employee);
    }*/
}

/*async function insertReportinDb(report_type, description, id_scrub, id_employee) {
    const stmt = new PS({
        name: "Report Scrub",
        text: `INSERT INTO report(report_type, description, id_scrub, id_reported_by)
      VALUES ($1,$2,$3,$4);`,
        values: [report_type, description, id_scrub, id_employee]
    });
    await db.none(stmt);
}*/

module.exports = Report;
