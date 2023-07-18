const express = require('express');
const router = express.Router();

//routes
router.use('/', require('./swagger'));  // use swagger routes located at \routes\swagger.js
router.use('/magazine', require('./magazine'));
router.use('/subscriber', require('./subscriber'));
router.use('/subscription', require('./subscription'));

//export
module.exports = router;
