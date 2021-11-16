const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./routes/users');
const historyRouter = require('./routes/HSM/borrow_history');
const employeeRouter = require('./routes/HSM/employee');


// MSM (for me it's weird to separate MSM from HSM like to have two routes for employees one for HSM and another for MSM no?)
const scrubsRouterMSM = require('./routes/MSM/scrubs');
const historyRouterMSM = require('./routes/MSM/borrow_history');
const reportsRouterMSM = require('./routes/MSM/reports');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use('/hsm/history', historyRouter);
app.use('/hsm/employee', employeeRouter);


app.use('/msm/scrubs', scrubsRouterMSM);
app.use('/msm/history', historyRouterMSM);
app.use('/msm/reports', reportsRouterMSM);

app.listen(port, () => console.log(`Listening on port ${port}`));
