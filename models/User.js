const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema is to tell Mongoose what to expect when we are uploading data
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
})

// The Mongoose 'model class' emulates a collection in mongodb. Mongoose will not
// overwrite existing database if named the same.
mongoose.model('users', userSchema);