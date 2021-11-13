const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const historyRouter = require('./routes/HSM/borrow_history');
const employeesRouter = require('./routes/HSM/employees');


// MSM (for me it's weird to separate MSM from HSM like to have two routes for employees one for HSM and another for MSM no?)
const scrubsRouterMSM = require('./routes/MSM/scrub');
const historyRouterMSM = require('./routes/MSM/borrow_history');
const reportRouterMSM = require('./routes/MSM/report');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/hsm/history', historyRouter);
app.use('/hsm/employess', employeesRouter);


app.use('/msm/scrubs', scrubsRouterMSM);
app.use('/msm/history', historyRouterMSM);
app.use('/msm/report', reportRouterMSM);

app.listen(port, () => console.log(`Listening on port ${port}`));
