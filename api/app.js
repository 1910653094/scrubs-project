const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const historyRouter = require('./routes/HSM/borrow_history');
const employeesRouter = require('./routes/HSM/employees');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/hsm/history', historyRouter);
app.use('/hsm/employess', employeesRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
