// NameEntry.jsx
// src/components/NameEntry.jsx
import { useState } from 'react'
import Button from './Button'

/**
 * NameEntry — classic arcade "enter your name" screen shown after a qualifying game.
 *
 * Props:
 *   score       — number of correct answers
 *   total       — total questions
 *   difficulty  — string difficulty value
 *   onSave      — fn(name) → called when player confirms their name
 *   onSkip      — fn() → called if player skips saving
 */
function NameEntry({ score, total, difficulty, onSave, onSkip }) {
  const [name, setName] = useState('')
  const percent = Math.round((score / total) * 100)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && name.trim()) onSave(name)
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg px-4">

      {/* Header */}
      <div className="text-center">
        <h2
          className="font-arcade text-neon-yellow text-xl leading-loose animate-flicker"
          style={{ textShadow: '0 0 10px #ffff00, 0 0 20px #ffff00' }}
        >
          NEW HIGH SCORE!
        </h2>
        <p
          className="font-arcade text-neon-green text-xs mt-3 leading-loose"
          style={{ textShadow: '0 0 8px #00ff88' }}
        >
          {score}/{total} &nbsp;·&nbsp; {percent}%
          {difficulty && difficulty !== 'any' && (
            <span style={{ color: '#aaa' }}> &nbsp;·&nbsp; {difficulty.toUpperCase()}</span>
          )}
        </p>
      </div>

      {/* Name input */}
      <div
        className="border-2 border-neon-cyan rounded-lg p-6 w-full flex flex-col items-center gap-4"
        style={{ boxShadow: '0 0 20px rgba(0,255,255,0.15)' }}
      >
        <p className="font-arcade text-neon-cyan text-xs text-center leading-loose">
          ENTER YOUR NAME
          <br />
          <span style={{ color: '#555', fontSize: '0.55rem' }}>(MAX 12 CHARACTERS)</span>
        </p>

        <input
          type="text"
          maxLength={12}
          value={name}
          autoFocus
          onChange={(e) => setName(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          placeholder="_ _ _ _ _ _ _ _ _ _ _ _"
          className="
            w-full bg-transparent border-b-2 border-neon-cyan
            font-arcade text-neon-yellow text-center text-sm
            py-2 tracking-widest
            focus:outline-none focus:border-neon-yellow
            transition-colors duration-200
            placeholder-opacity-30
          "
          style={{
            textShadow: '0 0 8px #ffff00',
            caretColor: '#ffff00',
          }}
        />

        <p className="font-arcade text-xs" style={{ color: '#444', fontSize: '0.55rem' }}>
          {name.length}/12
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          label="SAVE SCORE"
          color="green"
          size="lg"
          onClick={() => name.trim() && onSave(name)}
        />
        <Button
          label="SKIP"
          color="pink"
          size="md"
          onClick={onSkip}
        />
      </div>
    </div>
  )
}

export default NameEntry