const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected to sendit_db database!');
});

pool.on('remove', () => {
  console.log('Removed client');
});

const poolQuery = (queryText) => {
  pool.query(queryText)
    .then((result) => {
      console.log(result);
      pool.end();
    })
    .catch((error) => {
      console.log(error);
      pool.end();
    });
};

// Create database tables
const createUserTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS  user_account(
      user_id serial PRIMARY KEY,
      first_name VARCHAR (32) NOT NULL,
      last_name varchar (32) NOT NULL,
      other_names VARCHAR (32),
      email VARCHAR (128) UNIQUE NOT NULL,
      password VARCHAR (255) NOT NULL,
      username VARCHAR (32) UNIQUE NOT NULL,
      registered TIMESTAMP,
      is_admin BOOLEAN NOT NULL
      )`;

  poolQuery(queryText);
};

const createParcelTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS 
  parcel_order(
      parcel_id serial PRIMARY KEY,
      placed_by INTEGER NOT NULL,
      weight REAL,
      weight_metric VARCHAR (32),      
      sender TEXT NOT NULL,
      receiver TEXT NOT NULL,
      current_location TEXT,
      status VARCHAR (32),
      active BOOLEAN NOT NULL DEFAULT true,
      sent_on TIMESTAMP NOT NULL,
      delivered_on TIMESTAMP,
      FOREIGN KEY (placed_by) REFERENCES user_account (user_id) ON DELETE CASCADE
      )`;

  poolQuery(queryText);
};

const createTables = () => {
  createUserTable();
  createParcelTable();
};

// Drop tables
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS user_account';
  poolQuery(queryText);
};

const dropParcelTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcel_order';
  poolQuery(queryText);
};

const dropTables = () => {
  dropUserTable();
  dropParcelTable();
};


module.exports = {
  createUserTable,
  createParcelTable,
  createTables,
  dropUserTable,
  dropParcelTable,
  dropTables,
};

require('make-runnable');
