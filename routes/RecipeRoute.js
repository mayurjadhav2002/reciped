const express = require('express');
const recipe_route = express()
const bodyParser = require('body-parser');
const recipe_controller = require('../controllers/RecipeController')

recipe_route.use(bodyParser.json());
recipe_route.use(bodyParser.urlencoded({ extended: true }));
const userMiddleware = require('../middleware/UserAuth')

recipe_route.post('/create', userMiddleware.verifyToken, recipe_controller.CreateRecipe);
recipe_route.put('/update', userMiddleware.verifyToken, recipe_controller.UpdateRecipe);
recipe_route.post('/getallrecipe', userMiddleware.verifyToken, recipe_controller.getAllRecipe);
recipe_route.post('/getRecipeById', userMiddleware.verifyToken, recipe_controller.getRecipeById);
recipe_route.post('/getRecentlyEditedDoc', userMiddleware.verifyToken, recipe_controller.getRecentlyEditedRecipes)
module.exports = recipe_route
