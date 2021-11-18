const express = require('express');

const client = require('../../helper/elephantSQL');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const results = await client.query('SELECT "name", email, profession FROM employee');
        return res.status(200).json(results.rows);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;
