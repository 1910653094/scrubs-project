const dotenv = require('dotenv');
const pg = require('pg');

dotenv.config();

const databaseConfig = {
    connectionString: process.env.DATABASE_URL
};
const client = new pg.Pool(databaseConfig);

module.exports = client;
