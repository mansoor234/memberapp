'use strict';
const _ = require('lodash');
const { connection } = require('./connection-manager');
const className = 'Members';

/**
 * Add members and associate rewards (if any)
 * @param {*} request 
 * @param {*} response 
 */
const addMember = (request, response) => {
  const user = request.body;
  return connection()
    .then(conn => {
      const insertUser = `insert into members (firstname, lastname) values ('${user.firstname}','${user.lastname}')`;
      return conn.query(insertUser);
    })
    .then(() => {
      if (user.rewards && user.rewards.length > 0) {
        associateRewards(user);
      }
      return null;
    })
    .then(() => {
      response.send(200, { message: 'member added successfully' });
    })
    .catch(err => {
      response.send(503, { code: err.code, message: err.message });
    });
};

/**
 * Associate rewards for member
 * @param {*} user 
 */
const associateRewards = (user) => {
  return connection()
    .then(conn => {
      const rewards = _.get(user, 'rewards');
      const associateRewardsForUser = `insert into member_rewards (member_id, rewards) values ((
        select id from members where firstname='${user.firstname}' and lastname='${user.lastname}'), '${rewards}')`;
      return conn.query(associateRewardsForUser);
    });
};

/**
 * Delete member
 * @param {*} request 
 * @param {*} response 
 */
const deleteMember = (request, response) => {
  const params = request.params;
  return connection()
    .then(conn => {
      const deleteUser = `delete from members where id=${params.id}`;
      return conn.query(deleteUser);
    })
    .then(() => {
      response.send(200, { message: 'memberId deleted successfully' });
    })
    .catch(err => {
      response.send(503, { code: err.code, message: err.message });
    });
};

/**
 * Get members
 * @param {*} request 
 * @param {*} response 
 */
const getMember = (request, response) => {
  const params = request.params;
  return connection()
    .then(conn => {
      let getUserDetails = `select m.*, coalesce(mr.rewards, '') as rewards from members m left join member_rewards mr on m.id=mr.member_id`;
      if (!_.isEmpty(params.id)) {
        getUserDetails = getUserDetails.concat(` where id=${params.id}`);
      }
      return conn.query(getUserDetails);
    })
    .then((result) => {
      if (result && result.length > 0) {
        response.send(200, result);
      } else {
        response.send(404, { code: 404, message: 'member not found' });
      }
    })
    .catch(err => {
      response.send(503, { code: err.code, message: err.message });
    });
};

module.exports = { addMember, deleteMember, getMember };
