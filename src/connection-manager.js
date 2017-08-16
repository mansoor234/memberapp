'use strict';
const mysql = require('promise-mysql');
const className = 'ConnectionManager';

/**
 * mysql database connection
 */
const connection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'T0mnjerry',
    database: 'memberapp'
  });
};

module.exports = { connection };
