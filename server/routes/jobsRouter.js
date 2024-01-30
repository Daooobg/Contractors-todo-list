const router = require('express').Router();

const jobsController = require('../controllers/jobsController');

router.route('/addNewAddress').post(jobsController.addAddress);
router.route('/getAddressByPostcode/:postcode').get(jobsController.getAddressByPostcode);
router.route('/addNewContact/:id').post(jobsController.addNewContact);
router.route('/contacts/:id').delete(jobsController.deleteContact).post(jobsController.editContact);
router.route('/createJob').post(jobsController.createNewJob);
router.route('/getByOwner').get(jobsController.getAllJobsByOwnerId);
router.route('/jobs/:id').get(jobsController.getJobById);

module.exports = router;
