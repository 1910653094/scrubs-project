const express = require('express');
const { query, body, validationResult } = require('express-validator');

const Employee = require("../models/Employee");


const router = express.Router();

router.get('/', [
    query('id').isInt(),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let resObj = await new Employee(req.query.id).getEmployee();
    return res.status(resObj.status).json(resObj.response);
});

router.get('/all', async (req, res, next) => {
    let resObj = await new Employee().getAllEmployees();
    resObj.response.map(e => {
        delete e.id_employee;
        delete e.password;
    });
    return res.status(resObj.status).json(resObj.response);
});

// TODO test
router.get('/withBorrowings', [
    query('id').isInt(),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let resObj = await new Employee(req.query.id).getEmployeeWithBorrowings();
    return res.status(resObj.status).json(resObj.response);
});

router.post('/', [
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty(),
    body('name')
        .not().isEmpty(),
    body('profession')
        .not().isEmpty(),
    body('gender')
        .not().isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const obj = req.body;
    let resObj = await new Employee(null, obj.email, obj.password, obj.name, obj.profession, obj.gender).insertEmployee();
    return res.status(resObj.status).json(resObj.response);
});

router.post('/login', [
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .not().isEmpty(),
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Employee(null, obj.email, obj.password).login();
    return res.status(resObj.status).json(resObj.response);
});

module.exports = router;
