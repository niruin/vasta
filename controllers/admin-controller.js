const Deposit = require('../models/deposit-model');
const User = require('../models/user-model');
const Withdraw = require('../models/withdraw-model');
const Chat = require('../models/chat-model');
const adminService = require('../services/admin-service');

class AdminController {
  async getDeposits(req, res) {
    try {
      const deposits = await Deposit.find();
      res.json({success: 1, deposits});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      const usersMapping = users.map(item => ({
        id: item._id,
        deposits: item.deposits,
        role: item.role,
        username: item.username,
        verified: item.verified,
        verificationStatus: item.verificationStatus,
        withdraws: item.withdraws,
        balance: item.balance,
        referrals: item.referrals,
        docs: item.docs,
      }));
      res.json({success: 1, users: usersMapping});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async getWithdraws(req, res) {
    try {
      const withdraws = await Withdraw.find();
      res.json({success: 1, withdraws});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async getChats(req, res) {
    try {
      const chats = await Chat.find();
      res.json({success: 1, chats});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async updateDeposit(req, res) {
    try {
      const {id, status, userId, amount, coin} = req.body;
      const result = await adminService.updateDeposit(id, status, userId);
      if (status === 'Success') {
        const user = await User.findById(userId);
        const balance = Number(user.balance[coin]) + Number(amount);
        await User.findByIdAndUpdate(userId, {status, balance: {...user.balance, [coin]: balance}});
      }
      res.json({success: 1, result: result.status});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async updateWithdraw(req, res) {
    try {
      const {id, status, userId, amount, coin} = req.body;
      const result = await adminService.updateWithdraw(id, status, userId);
      if (status === 'Success') {
        const user = await User.findById(userId);
        const balance = Number(user.balance[coin]) - Number(amount);
        await User.findByIdAndUpdate(userId, {status, balance: {...user.balance, [coin]: balance}});
      }
      res.json({success: 1, result: result.status});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async updateVerification(req, res) {
    try {
      const {userId, status} = req.body;

      const isVerified = status === 'SUCCESS';
      await User.findByIdAndUpdate(userId, {verificationStatus: status, verified: isVerified});
      res.json({success: 1});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }
}

module.exports = new AdminController();