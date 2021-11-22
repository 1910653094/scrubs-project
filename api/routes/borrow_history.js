const express = require('express');

const BorrowHistory = require('../models/BorrowHistory');
const { query, validationResult } = require("express-validator");

const router = express.Router();

router.get('/', async (req, res, next) => {
    const obj = await new BorrowHistory().getAllBorrowHistory();
    return res.status(obj.status).json(obj.response);
})

router.get('/fromEmployee', [
    query('id')
        .isInt({ min: 1 })
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = await new BorrowHistory().getBorrowHistoryFromEmployee(req.query.id);
    return res.status(obj.status).json(obj.response);
});

module.exports = router;
