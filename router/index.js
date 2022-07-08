const Router = require('express').Router;

const userController = require('../controllers/user-controller');
const chatController = require('../controllers/chat-controller');
const adminController = require('../controllers/admin-controller');
const binanceController = require('../controllers/binance-controller');
const roleMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/deposit', roleMiddleware(['USER', 'ADMIN']), userController.deposit);
router.post('/withdraw', roleMiddleware(['USER', 'ADMIN']), userController.withdraw);
router.post('/verification', roleMiddleware(['USER', 'ADMIN']), userController.verification);
router.post('/update-balance', roleMiddleware(['USER', 'ADMIN']), userController.updateBalance);
router.post('/support-chat', roleMiddleware(['USER', 'ADMIN']), chatController.postMessage);
router.post('/update-deposit', roleMiddleware(['ADMIN']), adminController.updateDeposit);
router.post('/update-withdraw', roleMiddleware(['ADMIN']), adminController.updateWithdraw);
router.post('/update-verification', roleMiddleware(['ADMIN']), adminController.updateVerification);

router.get('/deposit-list', roleMiddleware(['ADMIN']), adminController.getDeposits);
router.get('/withdraw-list', roleMiddleware(['ADMIN']), adminController.getWithdraws);
router.get('/chat-list', roleMiddleware(['ADMIN']), adminController.getChats);
router.get('/users', roleMiddleware(['ADMIN']), adminController.getUsers);
router.get('/support-chat', roleMiddleware(['USER', 'ADMIN']), chatController.getAllMessages);
router.get('/dictionary', roleMiddleware(['USER', 'ADMIN']), userController.getDictionary);
router.get('/user', roleMiddleware(['USER', 'ADMIN']), userController.getUser);
router.get('/refresh', userController.refreshToken);

router.post('/binance/depth', roleMiddleware(['USER', 'ADMIN']), binanceController.getDepthBySymbol);
router.post('/binance/trades', roleMiddleware(['USER', 'ADMIN']), binanceController.getTradesBySymbol);
router.get('/binance/ticker', roleMiddleware(['USER', 'ADMIN']), binanceController.getTicker);
router.get('/binance/symbol-info', roleMiddleware(['USER', 'ADMIN']), binanceController.getSymbolInfo);

module.exports = router;
