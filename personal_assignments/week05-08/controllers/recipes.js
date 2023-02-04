const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('recipes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('recipes').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createRecipe = async (req, res) => {
  const recipe = {
    recipeName: req.body.recipeName,
    description: req.body.description,
    source: req.body.source,
    servings: req.body.servings,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    category: req.body.category,
    keywords: req.body.keywords,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };
  const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while creating this record.');
  }
};

const updateRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const recipe = {
    recipeName: req.body.recipeName,
    description: req.body.description,
    source: req.body.source,
    servings: req.body.servings,
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime,
    category: req.body.category,
    keywords: req.body.keywords,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  };
  const response = await mongodb.getDb().db().collection('recipes').replaceOne({ _id: userId }, recipe);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating this record.');
  }
};

const deleteRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: userId }, true);
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
  createRecipe,
  updateRecipe, 
  deleteRecipe
};
