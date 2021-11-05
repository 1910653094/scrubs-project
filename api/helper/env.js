const dotenv = require('dotenv');

dotenv.config();

export default {
    database_url: process.env.DATABASE_URL,
};
