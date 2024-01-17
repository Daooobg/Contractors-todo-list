const router = require('express').Router();

const jobsController = require('../controllers/jobsController');

router.route('/addNewAddress').post(jobsController.addAddress);

module.exports = router;
