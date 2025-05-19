const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: String,
  custom_id: String,
});

module.exports = mongoose.model('User', UserSchema);