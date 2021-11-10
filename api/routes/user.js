const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const client = require('../helper/elephantSQL');
const getUser = require('../helper/getUser');

const router = express.Router();


router.get('/', async (req, res, next) => {
    const user = await getUser(client, req.query.id);
    if (user.err) {
        return res.status(400).json({ error: user.err });
    }
    return res.status(200).json(user);
});

router.post('/login', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = req.body;
    try {
        const results = await client.query(
            'SELECT * FROM "user" WHERE username = $1',
            [user.username]
        );
        const dbUser = results.rows[0];

        if (!dbUser) {
            return res.status(404).json({ error: "Username not found in Database" });
        }

        bcrypt.compare(user.password, dbUser.password, (error, result) => {
            if (error) {
                return res.status(500).json({ error: error });
            }
            if (result) {
                return res.status(200).json(dbUser);
            }
            return res.status(400).json({ error: "Passwords do not match" });
        });
    } catch(err) {
        return res.status(400).json({ error: err });
    }
})

// register / create user
router.post('/', [
    body('username').isLength({min: 4}),
    body('password').isLength({min: 4}),
    body('email').isEmail().normalizeEmail(),
    body('dob').custom(value => checkDate(value)),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = req.body;
    const password = bcrypt.hashSync(user.password, 10);
    try {
        const results = await client.query(
                'INSERT INTO "user"(username, password, email, dob) VALUES ($1, $2, $3, $4) RETURNING *',
                [user.username, password, user.email, user.dob]);
        return res.status(200).json(results.rows[0]);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

router.put('/',[
    body('username').isLength({min: 4}),
    body('password').isLength({min: 4}),
    body('email').isEmail().normalizeEmail(),
    body('dob').custom(value => checkDate(value)),
    body('user_id').isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = req.body;
    const oldUser = await getUser(client, user.user_id);
    let password = oldUser.password;
    if (!bcrypt.compare(user.password, oldUser.password)) {
        password = bcrypt.hashSync(user.password, 10);
    }

    try {
        const results = await
            client.query(
                'UPDATE "user" SET username = $1, password = $2, email = $3, dob = $4 WHERE user_id = $5 RETURNING *',
                [user.username, password, user.email, user.dob, user.user_id]);
        return res.status(200).json(results.rows[0]);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

router.delete('/', [
    body('user_id').isInt({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const results = await
            client.query(
                'DELETE FROM "user" WHERE user_id = $1 RETURNING *',
                [req.body.user_id]);
        return res.status(200).json(results.rows[0]);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});


const checkDate = value => {
    if (/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value)) {
        let [y, m, d] = value.split('-');
        let dob = new Date(parseInt(y), parseInt(m), parseInt(d));
        let diffDate = new Date(Date.now() - dob);
        if (Math.abs(diffDate.getUTCFullYear() - 1970) < 18) {
            return throw new Error("The person is too young");
        }
        return true;
    } else {
        return throw new Error("Invalid Date Format");
    }
}

module.exports = router;
