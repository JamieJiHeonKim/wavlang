const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // },
    // profilePicture: {
    //     type: String,
    //     required: false
    // }
}, { timestamps: true });

const userdb = new mongoose.model('User', userSchema);

module.exports = userdb;