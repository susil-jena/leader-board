const User = require('./models/User');
const Activity = require('./models/Activity');
const Leaderboard = require('./models/Rank'); // ✅ Import Rank model
const { faker } = require('@faker-js/faker');
const dayjs = require('dayjs');

const recalculateLeaderboard = async () => {
  const activities = await Activity.find({}).populate('user');
  const userPointMap = {};
  console.log('Activities found:', activities.length);

  for (const { user, points } of activities) {
    if (!user) continue;
    const userId = user._id.toString();
    userPointMap[userId] = (userPointMap[userId] || 0) + points;
  }

  const sorted = Object.entries(userPointMap).sort((a, b) => b[1] - a[1]);

  let rank = 1;
  let prevPoints = null;

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

  console.log('✅ Leaderboard recalculated with dense ranking');
};

const seedData = async () => {
  const users = await User.find();
  if (users.length) return;

  await User.deleteMany({});
  await Activity.deleteMany({});
  await Leaderboard.deleteMany({});

  const newUsers = await User.insertMany(
    Array.from({ length: 40 }).map((_, i) => ({
      fullName: faker.person.fullName(),
      custom_id: i + 1, // 👈 custom numeric userId starting from 1
    }))
  );

  const activities = [];
  newUsers.forEach((user) => {
    const activityCount = Math.floor(Math.random() * 20) + 5;
    for (let i = 0; i < activityCount; i++) {
      const daysAgo = Math.floor(Math.random() * 365);
      const date = dayjs().subtract(daysAgo, 'day').toDate();
      activities.push({ user: user._id, performedAt: date, points: 20 });
    }
  });

  await Activity.insertMany(activities);

  await recalculateLeaderboard();
};

module.exports = seedData;
