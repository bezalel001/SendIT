import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config(); // find and expose environment variables

// connect to database
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL,
});

// A custom query function
const querySendItDb = (queryText, values) => new Promise((resolve, reject) => {
  pool.query(queryText, values)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default querySendItDb;
