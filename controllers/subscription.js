const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllSubscription = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('subscription').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscriptionId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('subscription').find({ _id: subscriptionId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createSubscription = async (req, res) => {
  try {
    const subscription = {
      subscriptionKey: req.body.subscriptionKey,
      magazineKey: req.body.magazineKey,
      subscriberKey: req.body.subscriberKey,
      startDate: req.body.startDate,
      length: req.body.length
    };
    const response = await mongodb.getDb().db().collection('subscription').insertOne(subscription);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the subscription.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscriptionId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const subscription = {
      subscriptionKey: req.body.subscriptionKey,
      magazineKey: req.body.magazineKey,
      subscriberKey: req.body.subscriberKey,
      startDate: req.body.startDate,
      length: req.body.length
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('subscription')
      .replaceOne({ _id: subscriptionId }, subscription);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the subscription.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('subscription')
      .remove({ _id: subscriptionId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the subscription.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllSubscription,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription
};
