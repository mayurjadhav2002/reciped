const Recipe = require('../models/Recipe')



const getAllRecipe = async (req, res) => {
    try {
        const user = req.body.userId;
        const result = await Recipe.find({ created_by: user })
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
                console.log("Block RUnnning")
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
            RecipeId: req.body.recipe_id,
            created_by: req.body.created_by,
            deleted: false
        });
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
            recentlyEditedDocs,
        });

    } catch (error) {
        console.error("Error occurred while fetching RecipeId details", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}




module.exports = {CreateRecipe, UpdateRecipe, getRecipeById, getRecentlyEditedRecipes, getAllRecipe}