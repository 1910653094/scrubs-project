const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const cors = require('cors');

const employeeRouter = require('./routes/employee');
const historyRouter = require('./routes/borrow_history');
const reportsRouter = require('./routes/reports');
const roomsRouter = require('./routes/rooms');
const scrubsRouter = require('./routes/scrubs');

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

app.use('/employee', employeeRouter);
app.use('/history', historyRouter);
app.use('/reports', reportsRouter);
app.use('/rooms', roomsRouter);
app.use('/scrubs', scrubsRouter);


// scheduled Task which runs every day at midnight (time flexible)
// -> checks all scrubs which are borrowed => if some are overdue -> sends mail to person
cron.schedule('0 0 * * *', () => {

}, {});

app.listen(port, () => console.log(`Listening on port ${port}`));
