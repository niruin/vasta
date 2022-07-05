const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const Role = require('../models/role-model');
const Deposit = require('../models/deposit-model');
const tokenService = require('./token-service');
const {BILLS} = require('./consts');

class AdminService {
  async getDeposits(usernameId, payload) {

  }
}

module.exports = new AdminService();