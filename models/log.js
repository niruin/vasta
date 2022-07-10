const {Schema, model} = require('mongoose')

const schema = new Schema({
  url: {type: String},
})

module.exports = model('Log',schema)