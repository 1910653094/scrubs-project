"use strict";

const query = require("../helper/query");
const BorrowHistory = require("./BorrowHistory");

class Report {
    constructor(id_report, report_type, description, id_scrub, id_reported_by) {
        this.id_report = id_report;
        this.report_type = report_type;
        this.description = description;
        this.id_scrub = id_scrub;
        this.id_reported_by = id_reported_by;
    };

    insertReport = async (id_history, quantity) => {
        let resObj = await new BorrowHistory(id_history).getScrubs();


        await query(
            'Insert a report',
            'INSERT INTO report(report_type, description, id_scrub, id_reported_by) VALUES ($1, $2, $3, $4)',
            [this.report_type, this.description, this.id_scrub, this.id_reported_by]
        );
    };

    

}


module.exports = Report;
