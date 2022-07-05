const Deposit = require('../models/deposit-model');
const adminService = require('../services/admin-service');
const {NETWORKS, COINS} = require('./dictionary');

class AdminController {
  async getDeposits(req, res) {
    try {
      const deposits = await Deposit.find();
      res.json({success: 1, deposits});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }
}

module.exports = new AdminController();