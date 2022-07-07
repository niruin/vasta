const {Schema, model} = require('mongoose');

const schema = new Schema({
  userId: {type: String, require: true},
  messages: [
    {
      message: {type: String, require: true},
      date: {type: String, require: true},
      admin: {type: Boolean, require: true, default: false},
    },
  ],
  unreadBySupport: {type: Boolean, require: true, default: false},
  unreadByUser: {type: Boolean, require: true, default: false},
});

module.exports = model('Chat', schema);