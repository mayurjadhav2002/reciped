const express = require('express');
const recipe_route = express()
const bodyParser = require('body-parser');
const recipe_controller = require('../controllers/RecipeController')

recipe_route.use(bodyParser.json());
recipe_route.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../middleware/UserAuth')

recipe_route.post('/create', userMiddleware.verifyToken, recipe_controller.CreateRecipe);
recipe_route.put('/update', userMiddleware.verifyToken, recipe_controller.UpdateRecipe);
recipe_route.get('/getallrecipe', recipe_controller.getAllRecipe);
recipe_route.post('/getRecipeById', userMiddleware.verifyToken, recipe_controller.getRecipeById);
recipe_route.post('/getsingleRecipe',  recipe_controller.GetASingleRecipe);
recipe_route.get('/getrecommendedRecipes', recipe_controller.getRecommendedRecipes)
recipe_route.post('/getRecentlyEditedrecipe', userMiddleware.verifyToken, recipe_controller.getRecentlyEditedRecipes)
recipe_route.post('/searchRecipe', recipe_controller.searchRecipe);
recipe_route.delete('/deleteRecipe/:recipeId', userMiddleware.verifyToken, recipe_controller.deleteRecipe);

module.exports = recipe_route
