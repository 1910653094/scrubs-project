const express = require('express');

const ReturnHistory = require("../models/ReturnHistory");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post('/', [
    body('id_history')
        .isInt({ min: 1 }),
    body('quantity')
        .isInt({ min: 1 })
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = req.body;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let returnHistory = new ReturnHistory(null, date, obj.quantity, obj.id_history);

    let unreturnedScrubs = await returnHistory.getNumberOfUnreturnedUnreportedScrubsByHistory();
    if(unreturnedScrubs.response[0].count - obj.quantity < 0){
        return res.status(400).json({errors: "Not enough scrubs to return"})
    }

    // TODO => add transaction sql commit for these things is better!
    await returnHistory.setBorrowedStateScrubsToFalse();

    if(unreturnedScrubs.response[0].count - obj.quantity <= 0){
        await returnHistory.setCompletelyReturnedTrue();
    }
    let resObj = await returnHistory.insertReturn();
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;
