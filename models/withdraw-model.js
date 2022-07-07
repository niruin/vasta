const {Schema, model} = require('mongoose');

const schema = new Schema({
  userId: {type: String, require: true},
  coin: {type: String, require: true},
  date: {type: String, require: true},
  amount: {type: String, require: true},
  network: {type: String, require: true},
  address: {type: String, require: true},
  status: {type: String, require: true, default: 'Pending'},
});

module.exports = model('Withdraw', schema);