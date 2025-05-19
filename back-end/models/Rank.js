const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RankSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  totalPoints: Number,
  rank: Number,
  filterType: { type: String, enum: ['day', 'month', 'year'] },
});

module.exports = mongoose.model('Rank', RankSchema);