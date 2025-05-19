// app/leaderboard/components/LeaderboardRow.tsx
import React from 'react';

export default function LeaderboardRow({ user, rank ,totalPoints}: { user: any; rank: string, totalPoints: string }) {
  return (
    <div className="flex justify-between p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg mb-2">
      <div className="w-1/6">{user?.custom_id}</div>
      <div className="w-1/3">{user?.fullName}</div>
      <div className="w-1/6">{totalPoints}</div>
      <div className="w-1/6">#{rank}</div>
    </div>
  );
}
