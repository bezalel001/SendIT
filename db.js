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
      password VARCHAR (32) NOT NULL,
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
      weight REAL NOT NULL,
      weight_metric VARCHAR (16) NOT NULL,      
      sender TEXT NOT NULL,
      receiver TEXT NOT NULL,
      current_location TEXT NOT NULL,
      sent_on TIMESTAMP NOT NULL,
      delivered_on TIMESTAMP NOT NULL, 
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
  const queryText = 'DROP TABLE IF EXISTS user returning *';
  poolQuery(queryText);
};

const dropParcelTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcel returning *';
  poolQuery(queryText);
};

const dropTables = () => {
  dropUserTable();
  dropParcelTable();
};


// add missing status column to  parcel_order
const addMissingColumn = () => {
  const query = 'ALTER TABLE parcel_order ADD COLUMN status VARCHAR (32)';
  poolQuery(query);
};
// update previous data
const updateStatusData1 = () => {
  const query1 = "UPDATE parcel_order SET status = 'placed' WHERE parcel_id = 1";


  poolQuery(query1);
};
// update previous data
const updateStatusData2 = () => {
  const query2 = "UPDATE parcel_order SET status = 'transiting' WHERE parcel_id = 2";
  poolQuery(query2);
};

// add not null constraint
const addConstraintToNewColumn = () => {
  const query = 'ALTER TABLE parcel_order ALTER COLUMN status SET NOT NULL';
  poolQuery(query);
};

// add active column to parcel database
const addActiveColumn = () => {
  const query = 'ALTER TABLE parcel_order ADD COLUMN active BOOLEAN';
  poolQuery(query);
};
// update previous data
const updateActiveData1 = () => {
  const query1 = 'UPDATE parcel_order SET active = true WHERE parcel_id = 4';


  poolQuery(query1);
};
// update previous data
const updateActiveData2 = () => {
  const query2 = 'UPDATE parcel_order SET active = true WHERE parcel_id = 5';
  poolQuery(query2);
};

// add not null constraint
const addConstraintToActiveColumn = () => {
  const query = 'ALTER TABLE parcel_order ALTER COLUMN active SET NOT NULL ';
  poolQuery(query);
};


module.exports = {
  createUserTable,
  createParcelTable,
  createTables,
  dropUserTable,
  dropParcelTable,
  dropTables,
  addMissingColumn,
  updateStatusData1,
  updateStatusData2,
  addConstraintToNewColumn,
  addActiveColumn,
  updateActiveData1,
  updateActiveData2,
  addConstraintToActiveColumn,
};

require('make-runnable');
