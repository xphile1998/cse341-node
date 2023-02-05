const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
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
