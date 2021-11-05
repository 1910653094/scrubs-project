const express = require('express');
const router = express.Router();

const client = require('../helper/elephantSQL');

router.get('/', async (req, res, next) => {
    try {
        const results = await client.query('SELECT * FROM test');
        res.json(results.rows);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
