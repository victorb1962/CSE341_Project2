const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../config/passwordComplexityCheck');

const getAllSubscriber = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('subscriber')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSubscriber = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid subscriber id to find a subscriber.');
  }
  const subscriberId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('subscriber')
    .find({ _id: subscriberId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createSubscriber = async (req, res) => {
  const subscriber = {
    subscriberKey: req.body.subscriberKey,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and Password can not be empty.' });
    return;
  }
  const password = req.body.password;
  const passwordCheck = passwordUtil.passwordPass(password);
  if (passwordCheck.error) {
    res.status(400).send({ message: passwordCheck.error });
    return;
  }

  const response = await mongodb.getDb().db().collection('subscriber').insertOne(subscriber);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the subscriber.');
  }
};

const updateSubscriber = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid subscriber id to update a subscriber.');
  }

  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and Password can not be empty.' });
    return;
  }
  const password = req.body.password;
  const passwordCheck = passwordUtil.passwordPass(password);
  if (passwordCheck.error) {
    res.status(400).send({ message: passwordCheck.error });
    return;
  }

  const subscriberId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const subscriber = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('subscriber')
    .replaceOne({ _id: subscriberId }, subscriber);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the subscriber.');
  }
};

const deleteSubscriber = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid subscriber id to delete a subscriber.');
  }
  const subscriberId = new ObjectId(req.params.id);

  if (!subscriberId) {
    res.status(400).send({ message: 'Invalid Id supplied.' });
    return;
  }

  const response = await mongodb
    .getDb()
    .db()
    .collection('subscriber')
    .remove({ _id: subscriberId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the subscriber.');
  }
};

module.exports = {
  getAllSubscriber,
  getSubscriber,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber,
  // loginSubscriber,
  // logoutSubscriber
};
