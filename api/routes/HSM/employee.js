const express = require('express');
const { query, body, validationResult } = require('express-validator');

const client = require('../../helper/elephantSQL');

const Employee = require("../../models/Employee");


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
    resObj.response.map(e => delete e.password);
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
        .not().isEmpty()
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let obj = req.body;
    let resObj = await new Employee(null, obj.email, obj.password, obj.name, obj.profession).insertEmployee();
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

/*
router.get('/medicalStaff', async (req, res, next) => {
    const id_employee = req.query.id;

    try {
        let result = await client.query(
            'SELECT "name", email, profession FROM employee WHERE id_employee = $1',
            [id_employee]
        );
        const user = result.rows[0];

        result = await client.query(
            'SELECT description, size, color, quantity, borrowed_date, return_date, returned ' +
            'FROM borrow_history ' +
            'JOIN scrub_type USING(id_scrub_type) ' +
            'WHERE id_employee = $1',
            [id_employee]
        );

        // -> in 1 {empl, borrowings: []} tun

        /!*const history = results.rows.map(r => {
            const today = new Date();
            if (!r.returned && today > r.return_date) r.status = 'Overdue';
            else if (!r.returned) r.status = 'Borrowing';
            else r.status = 'Returned';
            delete r['return_date'];
            delete r['returned'];
            return r;
        });*!/

        return res.status(200).json(history);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});
*/

module.exports = router;
