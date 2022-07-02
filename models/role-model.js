const {Schema, model} = require('mongoose')

const schema = new Schema({
  value: {type: String, unicode: true, default: 'USER'},
})

module.exports = model('Role',schema)