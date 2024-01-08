const Recipe = require('../models/Recipe')



const getAllRecipe = async (req, res) => {
    try {
        const result = await Recipe.find().sort({ 
            createdAt
            : 'desc' }).populate('created_by', 'name');
        return res.status(200).send({ success: true, message: "all Recipe fetched", data: result })
    } catch (error) {
        console.error('Error fetching distinct group names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const CreateRecipe = async (req, res) => {
    try {
        if (!req.body.userid) {
            return res.status(400).send({ success: false, msg: "User ID is required" });
        }
        let imageUrl;
        const recipeObject = JSON.parse(req.body.recipe);
        if (req.body.recipe) {
            for (const block of recipeObject.blocks) {
                if (block.type === "image" && block.data && block.data.file && block.data.file.url) {
                    imageUrl = block.data.file.url;
                    break; // Stop iterating once the first image is found
                }
            }
        }
        
        const request = new Recipe({
            created_by: req.body.userid,
            title: req.body.title,
            recipe:recipeObject,
            thumbnail: imageUrl 
        });

        const data = await request.save();

        if (data) {
            return res.status(200).send({ success: true, msg: "New doc created", data: data });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.log("Error occurred while creating new doc", error);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};



const searchRecipe = async (req, res) => {
    try {
        const { query } = req.query;
        console.log(query)
        // Search for recipes based on title or recipe content
        const recipes = await Recipe.find({
            $or: [
                { title: { $regex: new RegExp(query, 'i') } }, 
                { 'recipe.blocks.data.text': { $regex: new RegExp(query, 'i') } }, 
            ],
        }).populate('created_by', 'name');

        res.status(200).json({ success: true, recipes });
    } catch (error) {
        console.error('Error searching for recipes:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        console.log(recipeId)
        // Check if the recipe exists
        const existingRecipe = await Recipe.findByIdAndDelete(recipeId)
        if (!existingRecipe) {
            return res.status(404).json({ success: false, error: 'Recipe not found' });
        }

        res.status(200).json({ success: true, message: 'Recipe deleted successfully', data:existingRecipe });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};




const UpdateRecipe = async (req, res) => {
    try {
        const filter = { RecipeId: req.body.recipe_id, created_by: req.body.created_by };
        const update = { ...req.body };
        const options = { new: true, upsert: true };

        const result = await Recipe.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, msg: "Recipe Updated", data: result });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.error("Error occurred while updating or creating doc", error);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }

}




const getRecipeById = async (req, res) => {
    try {
        const result = await Recipe.find({
            _id: req.body.id,
            created_by: req.body.created_by,
            deleted: false
        })
        if (result) {
            return res.status(200).send({ success: true, msg: "Recipe Fetched", data: result });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.error("Error occurred while fetching the Recipe", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}

const GetASingleRecipe = async (req, res) => {
    try {
        const result = await Recipe.findOneAndUpdate({
            _id: req.body.id,
            deleted: false
        }, { $inc: { views: 1 } },{ new: true }).populate('created_by', 'name avatar _id');
        if (result) {
            return res.status(200).send({ success: true, msg: "Recipe Fetched", data: result });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.error("Error occurred while fetching the Recipe", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}


const getRecommendedRecipes = async (req, res) => {
    try {
      // Fetch recipes, sorted by views in descending order, and limit the result
      const recommendedRecipes = await Recipe.find({})
        .sort({ views: -1 })
        .limit(4)
        .populate('created_by', 'name');
  
      return res.status(200).json({
        success: true,
        message: 'Recommended recipes fetched',
        data: recommendedRecipes,
      });
    } catch (error) {
      console.error('Error fetching recommended recipes:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const getRecentlyEditedRecipes = async (req, res) => {
    try {
        const userId = req.body.userId;
        // Get recently edited documents based on UpdatedAt
        const recentlyEditedDocs = await Recipe.find({
            created_by: userId,
        }).sort({ updatedAt: 'desc' }).limit(10); // Adjust the limit as needed
        // Handle other response scenarios based on your requirements

        return res.status(200).send({
            success: true,
            data: recentlyEditedDocs,
        });

    } catch (error) {
        console.error("Error occurred while fetching RecipeId details", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}




module.exports = {CreateRecipe, UpdateRecipe, getRecipeById, getRecentlyEditedRecipes, getAllRecipe, getRecommendedRecipes, GetASingleRecipe, searchRecipe, deleteRecipe}