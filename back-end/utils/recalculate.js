const Activity = require('../models/Activity.js');
const Leaderboard = require('../models/Rank.js');

 const recalculateLeaderboard = async () => {
  const activities = await Activity.find({}).populate('user');
  const userPointMap = {};

  for (const { user, points } of activities) {
    if (!user) continue;
    const userId = user._id.toString(); // ✅ FIXED: use _id, not user.userId
    userPointMap[userId] = (userPointMap[userId] || 0) + points;
  }

  const sorted = Object.entries(userPointMap).sort((a, b) => b[1] - a[1]);

  let rank = 1;
  let prevPoints = null;
  let sameRankCount = 0;

  for (let i = 0; i < sorted.length; i++) {
    const [userId, totalPoints] = sorted[i];

    if (totalPoints !== prevPoints) {
      rank = rank; // no change if same, otherwise keep current rank
    }

    await Leaderboard.findOneAndUpdate(
      { userId },
      { userId, totalPoints, rank },
      { upsert: true, new: true }
    );

    // Only increment rank if next totalPoints will be different
    if (i + 1 < sorted.length && sorted[i + 1][1] !== totalPoints) {
      rank++;
    }

    prevPoints = totalPoints;
  }

  console.log('✅ Leaderboard recalculated');
};

module.exports = recalculateLeaderboard;