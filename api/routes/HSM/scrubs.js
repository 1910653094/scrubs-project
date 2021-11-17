const express = require('express');
const { body, validationResult } = require('express-validator');

const Scrub = require("../../models/Scrub");

const router = express.Router();


router.post('/borrow', [
    body('borrowed_date')
        .isDate({ format: 'YYYY-MM-DD' }),
    body('return_date')
        .isDate({ format: 'YYYY-MM-DD' }),
    body('id_scrub_type')
        .isInt({ min: 1 }),
    body('id_employee')
        .isInt({ min: 1 }),
    body('amount')
        .isInt({ min: 1 })
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Scrub(
        null, true, obj.borrowed_date, obj.return_date, obj.id_scrub_type, obj.id_employee)
        .borrowScrubs(obj.amount);
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;
