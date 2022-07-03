const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '30d'}) // 30s
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, ACCESS_TOKEN_SECRET)
      return userData
    } catch (e){
      return null
    }
  }

  validateAccessRefresh(token) {
    try {
      const userData = jwt.verify(token, REFRESH_TOKEN_SECRET)
      return userData
    } catch (e){
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const token = await tokenModel.findOne({user: userId})
    if (token) {
      token.token = refreshToken
      return token.save()
    }

    return await tokenModel.create({userId, refreshToken})
  }

  async removeToken(refreshToken) {
    await tokenModel.deleteOne({refreshToken})
  }

  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
  }
}

module.exports = new TokenService()