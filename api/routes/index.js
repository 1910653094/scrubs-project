const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log(process.env.DATABASE_URL);
    res.send({ express: 'Hello From Express!' });
});

module.exports = router;
