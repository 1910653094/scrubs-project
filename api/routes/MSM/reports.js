const express = require('express');

var Report = require("../../models/Report");

const router = express.Router();


// Report item : POST /msm/reports/
// TODO =>> NOT TESTED YET!! have to find something to test post request without frontend directly
router.post('/', async (req, res, next) => {
    const report_type = req.query.report_type;
    const description = req.query.description;
    const id_scrub = req.query.id_scrub;
    const id_employee = req.query.id_employee;

    try {
        Report.reportItem(report_type,description,id_scrub,id_employee);
        return res.status(200);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

module.exports = router;