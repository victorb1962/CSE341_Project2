const validator = require('../config/validate');

const saveSubscriber = (req, res, next) => {
  const validationRule = {
    subscriberKey: 'required|numeric',
    lastName: 'required|string',
    firstName: 'required|string',
    phone: 'required|string',
    email: 'required|email',
    username: 'required|string',
    password: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveMagazine = (req, res, next) => {
  const validationRule = {
    magazineKey: 'required|numeric',
    title: 'required|string',
    category: 'required|string',
    price: 'required|numeric',
    pubDate: 'required|date',
    publisher: 'required|string',
    url: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveSubscriber,
  saveMagazine
};
