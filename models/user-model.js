const {Schema, model} = require('mongoose');

const schema = new Schema({
  username: {type: String, unicode: true, require: true},
  password: {type: String, require: true},
  role: {type: String, ref: 'Role'},
  deposits: [
    {
      currency: {type: String, require: true},
      amount: {type: String, require: true},
      address: {type: String, require: true},
      network: {type: String, require: true},
      date: {type: String, require: true},
      status: {type: String, default: 'Pending'},
    }
  ],
  balance: {
    btc: {
      type: String,
      default: '0.00000000',
    },
    usdt: {
      type: String,
      default: '0.00000000',
    },
    eth: {
      type: String,
      default: '0.00000000',
    },
    ltc: {
      type: String,
      default: '0.00000000',
    },
    xrp: {
      type: String,
      default: '0.00000000',
    },
  },
});

module.exports = model('User', schema);