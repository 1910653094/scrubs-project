const express = require('express');

const Report = require("../models/Report");

const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post('/', [
    body('report_type')
        .not().isEmpty(),
    body('description')
        .not().isEmpty(),
    body('id_reported_by')
        .isInt({ min: 1 }),
    body('id_history')
        .isInt({ min: 1 }),
    body('quantity')
        .isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = req.body;
    const resObj = await new Report(
        null, obj.report_type, obj.description, null, obj.id_reported_by
    ).insertReport(obj.id_history, obj.quantity);
    return res.status(resObj.status).json(resObj.response);
});



module.exports = router;
