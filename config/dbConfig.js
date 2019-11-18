const knex = require('knex');

const knexConfig = require('../knexfile');

module.exports = knex(knexConfig[process.env.NODE_ENV || 'development']);