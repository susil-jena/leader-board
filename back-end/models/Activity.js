const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  performedAt: Date,
  points: { type: Number, default: 20 },
});

module.exports = mongoose.model('Activity', ActivitySchema);