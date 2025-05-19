// app/leaderboard/components/FilterControls.tsx
'use client';

import React, { useState } from 'react';

export default function FilterControls({ onSearch }: { onSearch: (id: string) => void }) {
  const [userId, setUserId] = useState('');
  const [filter, setFilter] = useState('Day');

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        className="p-2 rounded bg-black text-white border border-gray-600"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
        className="bg-gray-300 text-black px-4 py-2 rounded"
        onClick={() => onSearch(userId)}
      >
        Filter
      </button>

      <div className="relative">
        <label className="text-white mr-2">Sort by</label>
        <select
          className="bg-black text-white border border-gray-600 p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Day</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>
    </div>
  );
}
