const express = require('express');
const router = express.Router();

const subscriptionController = require('../controllers/subscription');
// const validation = require('../middleware/validate');

router.get('/', subscriptionController.getAllSubscription);

router.get('/:id', subscriptionController.getSubscription);

router.post('/', subscriptionController.createSubscription);

router.put('/:id', subscriptionController.updateSubscription);

router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
