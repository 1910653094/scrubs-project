const express = require('express');

const db = require('../../helper/elephantSQL');

const router = express.Router();

router.get('/overdue', async (req, res, next) => {
    const id_employee = req.query.id;

    try {
        let result = await db.query(
            'SELECT sc.id_scrub, sc.borrowed, sc.borrowed_date, sc.return_date, sc.id_scrub_type, sc.id_employee ' +
            'FROM scrub sc ' +
            'WHERE sc.return_date IS NULL AND sc.borrowed = \'true\' ' +
            'AND current_date - sc.borrowed_date > 7 AND sc.id_employee = $1;', [id_employee]);

        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
});

/*
  newUser.save().then(() => {
    jwt.sign({ email: newUser.email}, jwtSecret,{ expiresIn: LIFETIME_JWT }, (err, token) => {
      if (err) {
        console.error("POST users/ :", err);
        return res.status(500).send(err.message);
      }
      console.log("POST users/ token:", token);
      return res.json({ email: newUser.email, token });
    });
  });



*/

module.exports = router;
