const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipes');

router.get('/', recipeController.getAll);

router.get('/recipes/:id', recipeController.getSingle);

router.post('/recipes', recipeController.createRecipe);

router.put('/recipes/:id', recipeController.updateRecipe);

router.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = router;