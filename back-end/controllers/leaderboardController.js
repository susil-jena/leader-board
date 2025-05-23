const User = require('../models/User');
const Activity = require('../models/Activity');
const Rank = require('../models/Rank');
const dayjs = require('dayjs');
const recalculateLeaderboard = require('../utils/recalculate');

const getDateRange = (filter) => {
  const now = dayjs();
  if (filter === 'day') return { start: now.startOf('day').toDate(), end: now.endOf('day').toDate() };
  if (filter === 'month') return { start: now.startOf('month').toDate(), end: now.endOf('month').toDate() };
  return { start: now.startOf('year').toDate(), end: now.endOf('year').toDate() };
};

exports.getLeaderboard = async (req, res) => {
    try {
      const { filter, searchId } = req.query;
      // Build the MongoDB query conditionally
      const query = {};
      if (filter) {
          query.filterType = filter;
      }
      let ranks;
      if(searchId){
        ranks = await Rank.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'userId'  // rename 'as' to 'userId' to mimic populate field name
            }
          },
          { $unwind: '$userId' },
          { $match: { 'userId.custom_id': searchId } },
          { $sort: { rank: 1 } },
          { $limit: 1 }
        ]);
        
        // rank will be an array; get first or null
    
      }else{
        // Fetch rank data with optional filter
        ranks = await Rank.find().populate('userId').sort({ rank: 1 });
      }
      
  
      res.json(ranks);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.recalculateRanks = async (req, res) => {
    recalculateLeaderboard();
    res.json({ success: true, message: 'Ranks recalculated with dense ranking' });
  };