const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
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
        default: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    views:{
        type:Number,
        default: 1
    }

}, { timestamps: true });

module.exports = mongoose.model('Recipe', Recipe);
