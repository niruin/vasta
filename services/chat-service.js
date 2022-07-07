const Chat = require('../models/chat-model');
const User = require('../models/user-model');

class ChatService {

  async getAllMessages(userId) {
    const chat = await Chat.findOne({userId});

    return chat?.messages || [];
  }


  async postMessage(userId, date, message, role) {
    const chat = await Chat.findOne({userId});
    if(!chat) {
      const newChat = new Chat({userId, messages: [{message, date, admin: role === 'admin'}]});
      await newChat.save();
    } else {
      await Chat.findByIdAndUpdate(chat._id, { $push: {messages: [{message, date, admin: role === 'admin'}]}});
    }
  }
}

module.exports = new ChatService();