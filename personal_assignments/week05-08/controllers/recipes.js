const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('recipes')
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
    res.status(400).json('Must use a valid recipe id to find a recipe.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('recipes')
    .find({ _id: userId})
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valied recipe ID to update a recipe.');
  }
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must use a valied recipe ID to delete a recipe.');
  }  
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
