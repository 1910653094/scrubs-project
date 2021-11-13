const express = require('express');

const db = require('../../helper/elephantSQL');

const router = express.Router();

// Personal overdue scrubs : GET /msm/scrubs/overdue/
router.get('/overdue', async (req, res, next) => {
    const id_employee = req.query.id;

    try {
        let result = await db.query(
            'SELECT sc.id_scrub, sc.borrowed, sc.borrowed_date, sc.return_date, sc.id_scrub_type, sc.id_employee ' +
            'FROM scrub sc ' +
            'WHERE sc.return_date IS NULL AND sc.borrowed = \'true\' ' +
            'AND current_date - sc.borrowed_date > 7 AND sc.id_employee = $1;', [id_employee]);

        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

// Personal currently borrowed scrubs : GET /msm/scrubs/borrowed/currently/
router.get('/borrowed/currently', async (req, res, next) => {
    const id_employee = req.query.id;

    try {
        let result = await db.query(
            'SELECT sc.id_scrub, sc.borrowed, sc.borrowed_date, sc.return_date, sc.id_scrub_type, sc.id_employee ' + 
            'FROM scrub sc '+
            'WHERE sc.borrowed = \'true\' AND sc.return_date IS NULL AND sc.id_employee = $1;', [id_employee]);

        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});


module.exports = router;
