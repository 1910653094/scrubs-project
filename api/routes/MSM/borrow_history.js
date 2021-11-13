const express = require('express');

const client = require('../../helper/elephantSQL');

const router = express.Router();


// Personal borrow history : GET /msm/history/
router.get('/', async (req, res, next) => {
    const id_employee = 3//req.query.id;

    try {
        let results = await client.query(
            'SELECT bh.id_scrub_type, bh.borrowed_date, bh.return_date, bh.quantity ' +
            'FROM borrow_history bh ' +
            'WHERE bh.id_employee = $1', [id_employee]
        );

        return res.status(200).json(results.rows);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

module.exports = router;
