const express = require('express');

const BorrowHistory = require("../../models/BorrowHistory");

const router = express.Router();

// Personal borrow history : GET /msm/history/
router.get('/', async (req, res, next) => {
    const id_employee = req.query.id;
    try {
        let results = await BorrowHistory.getHistoryWithIdEmployee(id_employee);
        return res.status(200).json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
});

module.exports = router;
