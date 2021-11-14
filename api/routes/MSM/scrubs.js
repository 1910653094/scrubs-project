const express = require('express');

var Scrub = require("../../models/Scrub");

const router = express.Router();

// Personal overdue scrubs : GET /msm/scrubs/overdue/
router.get('/overdue', async (req, res, next) => {
    const id_employee = req.query.id;
    try {
        let results = await Scrub.getOverdueScrubsWithIdEmployee(id_employee);
        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// Personal currently borrowed scrubs : GET /msm/scrubs/borrowed/currently/
router.get('/borrowed/currently', async (req, res, next) => {
    const id_employee = req.query.id;
    try {
        let results = await Scrub.getScrubsCurrentlyBorrowedWithIdEmployee(id_employee);
        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});


module.exports = router;
