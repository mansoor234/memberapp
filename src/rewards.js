'use strict';
const { connection } = require('./connection-manager');
const className = 'Rewards';

/**
 * Add rewards
 * @param {*} request 
 * @param {*} response 
 */
const addRewards = (request, response) => {
  const rewardDetails = request.body;
  return connection()
    .then(conn => {
      const insertRewards = `insert into rewards (description, status) values ('${rewardDetails.description}','${rewardDetails.status}')`;
      return conn.query(insertRewards);
    })
    .then(() => {
      response.send(200, { message: 'reward added successfully' });
    })
    .catch(err => {
      response.send(503, { code: err.code, message: err.message });
    });
};

module.exports = { addRewards };
