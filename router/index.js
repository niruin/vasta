const Router = require('express').Router

const userController = require('../controllers/user-controller')
const chatController = require('../controllers/chat-controller')
const roleMiddleware = require('../middlewares/auth-middleware')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/deposit', roleMiddleware(['USER', 'ADMIN']), userController.deposit)
router.post('/support-chat', roleMiddleware(['USER', 'ADMIN']), chatController.postMessage)
router.get('/support-chat', roleMiddleware(['USER', 'ADMIN']), chatController.getAllMessages)
router.get('/dictionary', roleMiddleware(['USER', 'ADMIN']), userController.getDictionary)
router.get('/users', roleMiddleware(['ADMIN']), userController.getUsers)
router.get('/user', roleMiddleware(['USER', 'ADMIN']), userController.getUser)
router.get('/refresh', userController.refreshToken)

module.exports = router
