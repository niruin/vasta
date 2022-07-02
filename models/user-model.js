const {Schema, model} = require('mongoose')

const schema = new Schema({
  username: {type: String, unicode: true, require: true},
  password: {type: String, require: true},
  role: {type: String, ref:'Role'}
})

module.exports = model('User', schema)