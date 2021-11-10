const express = require('express');

const client = require('../../helper/elephantSQL');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const results = await client.query(
            'SELECT description, returned, return_date, quantity FROM borrow_history JOIN scrub_type USING(id_scrub_type)'
        );

        const history = results.rows.map(r => {
            const today = new Date();
            let s;
            if (!r.returned && today > r.return_date) s = 'Overdue';
            else if (!r.returned) s = 'Borrowing';
            else s = 'Returned';
            return JSON.stringify({
                type: r.description,
                status: s,
                return_on: r.return_date,
                quantity: r.quantity
            });
        });

        return res.status(200).json(history);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;
