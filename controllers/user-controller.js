const User = require('../models/user-model');
const Log = require('../models/log');
const userService = require('../services/user-service');
const {NETWORKS, COINS} = require('./dictionary');

class UserController {
  async registration(req, res) {
    try {
      const {username, password, referral} = req.body;
      const userData = await userService.registration(username, password, referral);

      if (referral) await userService.addReferral(username, referral);

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

      return res.json(
        {
          success: 1,
          token: userData.accessToken,
          refreshToken: userData.refreshToken,
          user: {
            id: userData.id,
            username: userData.username,
            role: userData.role,
          },
        },
      );
    } catch (e) {
      return res.status(500).json({success: 0, message: e.message || 'Error server'});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const token = await userService.login(username, password);

      res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json({success: 1, token: token.token});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'});
    }
  }

  async logout(req, res) {
    try {
      const {refreshToken} = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.json({success: 1});
    } catch (e) {
      console.log(e);
    }
  }

  async refreshToken(req, res) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.refresh(refreshToken);

      res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json({success: 1, token: token.accessToken, user: token.user});
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.find({username: req.user.username});
      const {
        role, username, _id: id, balance, deposits, withdraws, verified, verificationStatus,
      } = user[0];
      res.json({
        success: 1,
        user: {
          id,
          role,
          username,
          balance,
          deposits: deposits.reverse(),
          withdraws: withdraws.reverse(),
          verified,
          verificationStatus,
        },
      });
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error getUser'});
    }
  }

  async getDictionary(req, res) {
    res.json({success: 1, dictionary: {coins: COINS, networks: NETWORKS}});
  }

  async deposit(req, res) {
    try {
      const {amount, coin, network, usernameId} = req.body;
      const address = await userService.deposit(usernameId, {amount, coin, network});
      res.json({success: 1, address});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to add deposit1'});
    }
  }

  async withdraw(req, res) {
    try {
      const {amount, coin, network, usernameId, address} = req.body;
      const result = await userService.withdraw(usernameId, {amount, coin, network, address});
      res.json({success: 1, result});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to add withdraw'});
    }
  }

  async sendLog(req, res) {
    try {
      const {url} = req.body;
      // console.log('asdf', url);
      // const result = await userService.withdraw(usernameId, {amount, coin, network, address});

      const newLog = new Log({url});
      await newLog.save();
      res.json({success: 1});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to add log'});
    }
  }

  async verification(req, res) {
    try {
      const {id} = req.user;
      const {national, passportId, firstName, lastName, faceImage, passportImage} = req.body;
      const result = await userService.verification(id, national, passportId, firstName, lastName, faceImage, passportImage);
      res.json({success: 1});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to add verification'});
    }
  }

  async updateBalance(req, res) {
    try {
      const {id} = req.user;
      const {baseAsset, baseValue, quoteAsset, quoteValue} = req.body;
      const user = await User.findById(id);
      if (user) {
        const balanceQuote = Number(user.balance[quoteAsset]) + Number(quoteValue);
        const balanceBase = Number(user.balance[baseAsset]) + Number(baseValue);

        const newBalance = {...user.balance, [baseAsset]: balanceBase, [quoteAsset]: balanceQuote};
        await User.findByIdAndUpdate(id, {balance: newBalance});
      } else {
        const error = new Error();
        error.message = `Failed update balances`;
        throw error;
      }
      res.json({success: 1});
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed update balances'});
    }
  }
}

module.exports = new UserController();