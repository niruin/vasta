const chatService = require('../services/chat-service');
const userService = require('../services/user-service');

class ChatController {
  async postMessage(req, res) {
    try {
      const {userId, date, message} = req.body;
      const role = req.query.role
      await chatService.postMessage(userId, date, message, role);
      res.json({success: 1});
    } catch (e) {
      console.log(e);
    }
  }

  async getAllMessages(req, res) {
    try {
      const {id} = req.user;
      const data = await chatService.getAllMessages(id);
      res.json({success: 1, messages: data});
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ChatController();