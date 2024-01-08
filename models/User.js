const mongoose = require('mongoose')
const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    // Terms and Condition Checkbox
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        default: "18",
        required: false
    },
    avatar: {
        type: String,
        default: `${process.env.BACKEND_URL}/static/newUser.jpg`
    },
    password_reset: {
        type: String,
        default: ""
    },
    //  token sent to brower
    password_reset_token: {
        type: String,
        default: ""
    },


    access_token: {
        type: String,
        default: ""
    },
    signInType: [{
        google: {
            type: Boolean,
            default: false
        },
        normal: {
            type: Boolean,
            default: false
        },
        github: {
            type: Boolean,
            default: false
        }
    }],
    verified_account: {
        type: Boolean,
        // Setting Account verified true for demo purpose
        default: true
    },
    verification_token: {
        type: String,
        default: ""
    },
    delete_account: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

User.method({
    async authenticate(password) {
        return bcrypt.compare(password, this.hash_password);
    },
});

module.exports = mongoose.model('User', User);