const express = require('express');

const client = require('../../helper/elephantSQL');

const router = express.Router();


// Report item : POST /msm/report/
router.post('/', async (req, res, next) => {
    const report_type = req.query.report_type;
    const description = req.query.description;
    const id_scrub = req.query.id_scrub;
    const id_employee = req.query.id_employee;

    try {
        await client.query(
            'INSERT INTO report(report_type, description, id_scrub, id_employee) VALUES ($1,$2,$3,$4);'
            , [report_type, description, id_scrub, id_employee]
        );

        return res.status(200);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

module.exports = router;