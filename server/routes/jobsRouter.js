const router = require('express').Router();

const jobsController = require('../controllers/jobsController');

router.route('/addNewAddress').post(jobsController.addAddress);
router.route('/getAddressByPostcode/:postcode').get(jobsController.getAddressByPostcode);

module.exports = router;
