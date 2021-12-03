const express = require('express');

const Report = require("../models/Report");
const Scrub = require("../models/Scrub");
const ReturnHistory = require("../models/ReturnHistory");

const { body, validationResult } = require("express-validator");

const router = express.Router();

router.post('/', [
    body('report_type')
        .not().isEmpty(),
    body('description')
        .not().isEmpty(),
    body('id_scrub')
        .isInt({ min: 1 }),
    body('id_reported_by')
        .isInt({ min: 1 }),
    body('id_history')
        .isInt({ min: 1 }),
    body('quantity')
        .isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = req.body;
    let result = await new Scrub(null, null, null, null, null, null, null, null).getScrubUnreportedfromHistoryWithLimit(obj.id_history, obj.quantity);
    if(result.response.length - obj.quantity < 0){
        return res.status(400).json({ errors: "Not enough scrubs to report" });
    }


    let returnHistory = new ReturnHistory(null, null, obj.quantity, obj.id_history);
    let nbrScrubsUnreturnedUnreported = await returnHistory.getNumberOfUnreturnedUnreportedScrubsByHistory();
    if (nbrScrubsUnreturnedUnreported.response[0].count - obj.quantity <= 0){
        await returnHistory.setCompletelyReturnedTrue();
    }


    let resObj;
    for (let i = 0; i < result.response.length; i++) {
        resObj = await new Report(null, obj.report_type, obj.description, result.response[i].id_scrub, obj.id_reported_by).insertReport();
    }
    return res.status(resObj.status).json(resObj.response);
});



module.exports = router;
