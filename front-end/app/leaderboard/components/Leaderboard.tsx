// app/leaderboard/components/Leaderboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { mockUsers } from '../data/dummyData';
import LeaderboardRow from './LeaderboardRow';
import FilterControls from './FilterControls';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const calculateRanks = async () => {
    try {
      setLoading(true); // ✅ start loading
      await axios.post(`http://localhost:5000/api/recalculate`);
      await getUserData(); // wait for user data to refresh
    } catch (error) {
      console.error('Error recalculating leaderboard:', error);
    } finally {
      
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async (filter = 'all', searchId = '') => {
    try {
      setLoading(true); // ✅ start loading
      const response = await axios.get(`http://localhost:5000/api/leaderboard`, {
        params: { filter, searchId }
      });
      const users = response.data || [];
      setUsers(users);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  const handleSearch = (id: string) => {
    getUserData('',id)
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
  {/* Sticky header section */}
  <div className="sticky top-0 z-10 bg-black pb-4">
    <button
      className="bg-gray-300 text-black px-6 py-2 rounded mb-4"
      onClick={calculateRanks}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Recalculate'}
    </button>

    <FilterControls onSearch={handleSearch} />

    <div className="font-bold flex justify-between px-4 mb-2">
      <div className="w-1/6">ID</div>
      <div className="w-1/3">Name</div>
      <div className="w-1/6">Points</div>
      <div className="w-1/6">Rank</div>
    </div>
  </div>

  {/* Scrollable leaderboard rows */}
  {loading ? (
    <div className="text-center mt-10 text-lg text-gray-300">Loading leaderboard...</div>
  ) : (
    <div className="overflow-y-auto max-h-[70vh] pr-2">
      {users.map((user: any, key) => (
        <LeaderboardRow
          key={key}
          user={user?.userId}
          rank={user?.rank}
          totalPoints={user?.totalPoints}
        />
      ))}
    </div>
  )}
</div>

  );
}