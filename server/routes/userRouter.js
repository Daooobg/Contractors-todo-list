const router = require('express').Router();

const authController = require('../controllers/authController');
const guards = require('../middlewares/guards');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/usersVerifications').get(authController.usersVerifications);
router.route('/approveUser').post(authController.updateUserApprove);
router.route('/deleteUserData').post(authController.deleteUser);
router
    .route('/allApprovedUsers')
    .get(guards.restrictForAdmin, authController.getAllApprovedUsers)
    .post(guards.restrictForAdmin, authController.updateUser);

module.exports = router;
