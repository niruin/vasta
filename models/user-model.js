const {Schema, model} = require('mongoose');

const schema = new Schema({
  username: {type: String, unicode: true, require: true},
  password: {type: String, require: true},
  role: {type: String, ref: 'Role'},
  verified: {type: Boolean, require: true, default: false},
  verificationStatus: {type: String, default: 'OFF'}, // SUCCESS, FAILED, REVISION, OFF
  referrals: [{type: String}],
  docs: {
    national: {type: String},
    passportId: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    faceImage: {type: String},
    passportImage: {type: String},
  },
  deposits: [
    {
      id: {type: String, unicode: true, require: true},
      coin: {type: String, require: true},
      amount: {type: String, require: true},
      address: {type: String, require: true},
      network: {type: String, require: true},
      date: {type: String, require: true},
      status: {type: String, default: 'Pending'},
    },
  ],
  withdraws: [
    {
      id: {type: String, unicode: true, require: true},
      coin: {type: String, require: true},
      amount: {type: String, require: true},
      address: {type: String, require: true},
      network: {type: String, require: true},
      date: {type: String, require: true},
      status: {type: String, default: 'Pending'},
    },
  ],
  balance: {
    USDT: {
      type: String,
      default: '0.00000000',
    },
    USDC: {
      type: String,
      default: '0.00000000',
    },
    BUSD: {
      type: String,
      default: '0.00000000',
    },
    BTC: {
      type: String,
      default: '0.00000000',
    },
    ETH: {
      type: String,
      default: '0.00000000',
    },
    XRP: {
      type: String,
      default: '0.00000000',
    },
    DOT: {
      type: String,
      default: '0.00000000',
    },
    ADA: {
      type: String,
      default: '0.00000000',
    },
    LTC: {
      type: String,
      default: '0.00000000',
    },
    TRX: {
      type: String,
      default: '0.00000000',
    },
    BCH: {
      type: String,
      default: '0.00000000',
    },
    BNB: {
      type: String,
      default: '0.00000000',
    },
    XLM: {
      type: String,
      default: '0.00000000',
    },
  },
});

module.exports = model('User', schema);