"use strict";

const query = require("../helper/query");
const ScrubBorrowHistory = require("./ScrubBorrowHistory");

class Report {
    constructor(id_report, report_type, description, id_scrub, id_reported_by) {
        this.id_report = id_report;
        this.report_type = report_type;
        this.description = description;
        this.id_scrub = id_scrub;
        this.id_reported_by = id_reported_by;
    };

    insertReport = async (id_history, quantity) => {
        let res = await new ScrubBorrowHistory(null, null, id_history).getScrubs();

        if (res.status !== 200) {
            return res;
        }

        const scrubsArr = res.response.slice(0, quantity);

        await scrubsArr.every(async scrub => {
            res = await query(
                'Insert a report',
                'INSERT INTO report(report_type, description, id_scrub, id_reported_by) VALUES ($1, $2, $3, $4)',
                [this.report_type, this.description, scrub.id_scrub, this.id_reported_by]
            );
            if (res.status !== 200) {
                return false;
            }
        });

        return res;
    };
}


module.exports = Report;
