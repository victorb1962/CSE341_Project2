const express = require('express');
const router = express.Router();

const subscriberController = require('../controllers/subscriber');
const validation = require('../middleware/validate');

router.get('/', subscriberController.getAllSubscriber);

router.get('/:id', subscriberController.getSubscriber);

router.post('/', validation.saveSubscriber, subscriberController.createSubscriber);

router.put('/:id', subscriberController.updateSubscriber);

router.delete('/:id', subscriberController.deleteSubscriber);

module.exports = router;
