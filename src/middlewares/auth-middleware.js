const jwt = require('jsonwebtoken')

const tokenService = require('../services/token-service')

module.exports = function (roles) {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({success: 0, message: 'User not authorization'})
      }

      const userData = tokenService.validateAccessToken(token)
      if(!userData){
        return res.status(401).json({success: 0, message: 'User not authorization'})
      }
      const {role: userRole} = userData
      let hasRole = false
      if (roles.includes(userRole)) {
        hasRole = true
      }
      if (!hasRole) {
        return res.status(403).json({success: 0, message: 'User not success'})
      }
      req.user = userData
      next()
    } catch (e) {
      console.log(e)
      return res.status(500).json({success: 0, message: 'error middlewares'})
    }
  }
}