// HighScoreTable.jsx
// src/components/HighScoreTable.jsx
import Button from './Button'

const DIFFICULTY_COLORS = {
  easy: { color: '#00ff88', shadow: '0 0 8px #00ff88' },
  medium: { color: '#ffff00', shadow: '0 0 8px #ffff00' },
  hard: { color: '#ff00ff', shadow: '0 0 8px #ff00ff' },
  chad: { color: '#ff4444', shadow: '0 0 8px #ff4444, 0 0 16px #ff4444' },
  any: { color: '#00ffff', shadow: '0 0 8px #00ffff' },
}

const RANK_MEDALS = ['👑', '②', '③']

/**
 * HighScoreTable
 * Props:
 *   scores   — array from useHighScores
 *   onBack   — fn() → returns to welcome screen
 *   onClear  — fn() → clears all scores (optional, for dev/reset)
 */
function HighScoreTable({ scores, onBack, onClear }) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">

      {/* Title */}
      <h2
        className="font-arcade text-neon-cyan text-2xl text-center leading-loose animate-flicker"
        style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}
      >
        HIGH SCORES
      </h2>

      {/* Table */}
      <div
        className="border-2 border-neon-cyan rounded-lg w-full overflow-hidden"
        style={{ boxShadow: '0 0 20px rgba(0,255,255,0.15)' }}
      >
        {/* Header row */}
        <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-neon-cyan border-opacity-30 bg-neon-cyan bg-opacity-5">
          <span className="font-arcade text-neon-cyan text-xs col-span-1">#</span>
          <span className="font-arcade text-neon-cyan text-xs col-span-4">NAME</span>
          <span className="font-arcade text-neon-cyan text-xs col-span-3 text-center">SCORE</span>
          <span className="font-arcade text-neon-cyan text-xs col-span-2 text-center">DIFF</span>
          <span className="font-arcade text-neon-cyan text-xs col-span-2 text-right">DATE</span>
        </div>

        {/* Score rows */}
        {scores.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p
              className="font-arcade text-xs leading-loose"
              style={{ color: '#555' }}
            >
              NO SCORES YET
              <br />
              <span style={{ fontSize: '0.6rem', color: '#444' }}>PLAY A GAME TO GET ON THE BOARD</span>
            </p>
          </div>
        ) : (
          scores.map((entry, i) => {
            const diffStyle = DIFFICULTY_COLORS[entry.difficulty] ?? DIFFICULTY_COLORS.any
            const isTop3 = i < 3
            return (
              <div
                key={i}
                className={`grid grid-cols-12 gap-2 px-4 py-3 items-center transition-colors
                  ${i % 2 === 0 ? 'bg-white bg-opacity-0' : 'bg-white bg-opacity-5'}
                  ${i < scores.length - 1 ? 'border-b border-white border-opacity-5' : ''}
                `}
              >
                {/* Rank */}
                <span className="col-span-1 font-arcade text-xs" style={{ color: '#555' }}>
                  {isTop3 ? RANK_MEDALS[i] : `${i + 1}`}
                </span>

                {/* Name */}
                <span
                  className="col-span-4 font-arcade text-xs truncate"
                  style={{
                    color: isTop3 ? '#ffff00' : '#ccc',
                    textShadow: isTop3 ? '0 0 8px #ffff00' : 'none',
                  }}
                >
                  {entry.name}
                </span>

                {/* Score + percent */}
                <div className="col-span-3 flex flex-col items-center">
                  <span
                    className="font-arcade text-xs"
                    style={{ color: '#00ff88', textShadow: '0 0 6px #00ff88' }}
                  >
                    {entry.score}/{entry.total}
                  </span>
                  <span className="font-arcade text-xs" style={{ color: '#555', fontSize: '0.55rem' }}>
                    {entry.percent}%
                  </span>
                </div>

                {/* Difficulty badge */}
                <span
                  className="col-span-2 font-arcade text-center"
                  style={{
                    color: diffStyle.color,
                    textShadow: diffStyle.shadow,
                    fontSize: '0.5rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {entry.difficulty.toUpperCase()}
                </span>

                {/* Date */}
                <span
                  className="col-span-2 font-arcade text-right"
                  style={{ color: '#444', fontSize: '0.5rem' }}
                >
                  {entry.date}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Button label="BACK" color="cyan" size="md" onClick={onBack} />
        {onClear && scores.length > 0 && (
          <Button label="CLEAR SCORES" color="pink" size="md" onClick={onClear} />
        )}
      </div>
    </div>
  )
}

export default HighScoreTable