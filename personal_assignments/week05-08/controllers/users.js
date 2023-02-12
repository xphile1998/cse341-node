const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('users')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('users')
    .find({ _id: userId})
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const createUser = async (req, res) => {
  const user = {
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    preferredLanguage: req.body.preferredLanguage,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    public: req.body.public
  };
  const response = await mongodb.getDb().db().collection('users').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while creating this record.');
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valied user ID to update a user.');
  }
  const userId = new ObjectId(req.params.id);

  const user = {
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    preferredLanguage: req.body.preferredLanguage,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    public: req.body.public
  };
  const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating this record.');
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valied user ID to delete a user.');
  }
  const userId = new ObjectId(req.params.id);

  const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting this record.');
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createUser,
  updateUser, 
  deleteUser
};
