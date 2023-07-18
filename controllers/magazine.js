const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllMagazine = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('magazine').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMagazine = async (req, res) => {
  try {
    const magazineId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('magazine').find({ _id: magazineId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createMagazine = async (req, res) => {
  try {
    const magazine = {
      magazineKey: req.body.magazineKey,
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      pubDate: req.body.pubDate,
      publisher: req.body.publisher,
      url: req.body.url
    };
    const response = await mongodb.getDb().db().collection('magazine').insertOne(magazine);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the magazine.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateMagazine = async (req, res) => {
  try {
    const magazineId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const magazine = {
      magazineKey: req.body.magazineKey,
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      pubDate: req.body.pubDate,
      publisher: req.body.publisher,
      url: req.body.url
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('magazine')
      .replaceOne({ _id: magazineId }, magazine);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the magazine.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteMagazine = async (req, res) => {
  try {
    const magazineId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('magazine')
      .remove({ _id: magazineId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the magazine.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllMagazine,
  getMagazine,
  createMagazine,
  updateMagazine,
  deleteMagazine
};
