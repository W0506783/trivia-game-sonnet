// src/components/DifficultySelector.jsx
function DifficultySelector({ difficulty, setDifficulty }) {
  const difficulties = ["Easy", "Medium", "Hard"]

  return (
    <div className="flex flex-col items-center gap-2">
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="bg-gray-800 text-white border border-neon-cyan rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 w-48"
      >
        <option value="">Any Difficulty</option>
        {difficulties.map((dif) => (
          <option key={dif} value={dif.toLowerCase()}>
            {dif}
          </option>
        ))}
        <option value="chad" style={{ color: '#ff4444' }}>
          ☠ CHAD MODE
        </option>
      </select>
    </div>
  )
}

export default DifficultySelector