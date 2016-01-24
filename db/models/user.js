var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  twitterId: { type: String, required: true, index: { unique: true } },
  fullname: { type: String },
  photo: {type: String }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
