const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String
});

// creating a collection
mongoose.model('users', userSchema);