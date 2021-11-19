const express = require('express');

const Report = require("../models/Report");
const { body, validationResult } = require("express-validator");

const router = express.Router();


//TODO have to update that
router.post('/',[
    body('report_type')
        .not().isEmpty(),
    body('description')
        .not().isEmpty(),
    body('id_scrub')
        .isInt({ min: 1 }),
    body('id_reported_by')
        .isInt({ min: 1 })
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = req.body;
    let resObj = await new Report(null, obj.report_type, obj.description, obj.id_scrub, obj.id_reported_by).insertReport();
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;
