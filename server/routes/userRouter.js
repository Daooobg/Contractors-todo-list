const router = require('express').Router();

const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/usersVerifications').get(authController.usersVerifications);
router.route('/approveUser').post(authController.updateUserApprove);

module.exports = router;
