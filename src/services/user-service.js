const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const Role = require('../models/role-model')
const tokenService = require('./token-service')

class UserService {
  async registration(username, password){
    const isUnique = await User.findOne({username})
    if (isUnique) {
      const error = new Error()
      error.message = `Username ${username} already use`
      throw error
    }

    const hashPassword = bcrypt.hashSync(password, 7)
    const roleUser = await Role.findOne({value: 'USER'})
    const newUser = new User({username, password: hashPassword, role: roleUser.value})
    await newUser.save()
    const user = await User.findOne({username})

    const tokens = tokenService.generateTokens({id: user._id, role:user.role, username: user.username})
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return {
      ...tokens,
      id: user._id,
      role: user.role,
      username: user.username
    }
  }

  async login(username, password) {
    const user = await User.findOne({username})
    if (!user) {
      const error = new Error()
      error.message = `Username ${username} not found`
      throw error
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      const error = new Error()
      error.message = 'Password incorrect'
      throw error
    }
    const tokens = tokenService.generateTokens({id: user._id, role:user.role, username: user.username})
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      const error = new Error()
      error.message = 'user  unauthorized'
      throw error
    }

    const userData = tokenService.validateAccessRefresh(refreshToken)
    const tokenFromDB = tokenService.findToken(refreshToken)

    if(!userData || !tokenFromDB) {
      const error = new Error()
      error.message = 'user  unauthorized'
      throw error
    }
    const user = await User.findById(userData.id)
    const tokens = tokenService.generateTokens({id: userData.id, username: user.username, role: user.role})
    return {...tokens}
  }
}

module.exports = new UserService()