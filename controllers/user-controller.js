const User = require('../models/user-model')
const userService = require('../services/user-service')
const {NETWORKS, COINS} = require('./dictionary')

class UserController {
  async registration(req, res) {
    try {
      const {username, password} = req.body
      const userData = await userService.registration(username, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(
        {
          success: 1,
          token: userData.accessToken,
          refreshToken: userData.refreshToken,
          user: {
            id: userData.id,
            username: userData.username,
            role: userData.role
          }
        }
      )
    } catch (e) {
      return res.status(500).json({success: 0, message: e.message ||'Error server'})
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body
      const token = await userService.login(username, password)

      res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({success: 1, token: token.token})
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'})
    }
  }

  async logout(req, res) {
    try {
      const {refreshToken} = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      res.json({success: 1})
    } catch (e) {
      console.log(e)
    }
  }

  async refreshToken(req, res) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.refresh(refreshToken)

      res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({success: 1, token: token.accessToken, user: token.user})
    } catch (e) {
      console.log(e)
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error server'})
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.find({username: req.user.username})
      const {role, username, _id: id, balance, deposits} = user[0]
      res.json({success: 1, user: {id, role, username, balance, deposits: deposits.reverse()}})
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Error getUser'})
    }
  }

  async getDictionary(req, res) {
    res.json({success: 1, dictionary: {coins: COINS, networks: NETWORKS}})
  }

  async deposit(req, res) {
    try {
      const {amount, currency, network, usernameId} = req.body
      const address = await userService.deposit(usernameId, {amount, currency, network})
      res.json({success: 1, address})
    } catch (e) {
      return res.status(500).json({success: 0, message: 'Failed to add deposit1'})
    }
  }
}

module.exports = new UserController()