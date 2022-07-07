const Deposit = require('../models/deposit-model');
const Withdraw = require('../models/withdraw-model');
const User = require('../models/user-model');

class AdminService {
  async updateDeposit(id, status, userId) {
    const data = await Deposit.findByIdAndUpdate(id, {status});
    await User.findOneAndUpdate({userId, 'deposits.id' : id}, {'$set': {'deposits.$.status': status}});
    return data;
  }

  async updateWithdraw(id, status, userId) {
    const data = await Withdraw.findByIdAndUpdate(id, {status});
    await User.findOneAndUpdate({userId, 'withdraws.id' : id}, {'$set': {'withdraws.$.status': status}});
    return data;
  }
}

module.exports = new AdminService();