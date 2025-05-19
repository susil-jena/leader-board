type Props = {
  userId: string
  setUserId: (val: string) => void
  filter: 'day' | 'month' | 'year'
  setFilter: (val: 'day' | 'month' | 'year') => void
  onFilter: () => void
}

export default function FilterForm({ userId, setUserId, filter, setFilter, onFilter }: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <div>
          <label className="block mb-1">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="bg-black border border-gray-600 text-white px-4 py-2 rounded"
          />
        </div>
        <button
          onClick={onFilter}
          className="bg-gray-300 text-black px-6 py-2 mt-6 rounded text-lg"
        >
          Filter
        </button>
      </div>

      <div className="text-center">
        <p className="mb-2">Sort by Day</p>
        <div className="flex gap-4">
          {['day', 'month', 'year'].map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                value={opt}
                checked={filter === opt}
                onChange={() => setFilter(opt as any)}
              />
              <span className="ml-2 capitalize">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
