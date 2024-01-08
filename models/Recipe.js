const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
    RecipeId: {
        type: String,
        require: true
    }
    ,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    published: {
        type: Boolean,
        default: true // prod true
    },
    title: {
        type: String,
    },
    recipe: {
        type: Object
    },
    tags: [
        {
            type:String
        }
    ],
    thumbnail:{
        type:String,
        default: ''
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Recipe', Recipe);
