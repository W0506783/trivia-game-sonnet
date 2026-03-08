// src/components/QuestionCard.jsx
import { useState, useMemo, useEffect } from 'react'
import AnswerButton from './AnswerButton'

const CHAD_SECONDS = 10

const decode = (str) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}

/**
 * QuestionCard
 * New props for Chad Mode:
 *   isChad    — boolean, enables the countdown timer
 *   onTimeout — fn() called when timer hits zero (App handles auto-advance)
 */
function QuestionCard({ question, onAnswer, isChad = false, onTimeout }) {
  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(CHAD_SECONDS)

  const answers = useMemo(() => {
    const all = [...question.incorrect_answers, question.correct_answer]
    // eslint-disable-next-line
    return all.sort(() => Math.random() - 0.5)
  }, [question])

  // ── Chad Mode timer ────────────────────────────────────────────────────────
  useEffect(() => {
    // Only run timer in Chad Mode and before an answer is selected
    if (!isChad || selected) return

    if (timeLeft <= 0) {
      // Time's up — mark as wrong and notify parent
      setSelected('__timeout__')
      onAnswer(false)
      if (onTimeout) onTimeout()
      return
    }

    const tick = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(tick) // cleanup on unmount or re-run
  }, [isChad, timeLeft, selected, onAnswer, onTimeout])

  // ── Answer handling ────────────────────────────────────────────────────────
  const handleAnswer = (answer) => {
    if (selected) return
    setSelected(answer)
    onAnswer(answer === question.correct_answer)
  }

  const getState = (answer) => {
    if (!selected) return 'default'
    if (answer === question.correct_answer) return 'correct'
    if (answer === selected) return 'incorrect'
    return 'disabled'
  }

  // ── Timer bar calculations ─────────────────────────────────────────────────
  const timerPercent = (timeLeft / CHAD_SECONDS) * 100
  const isCritical = timeLeft <= 3
  const timerColor = isCritical ? '#ff4444' : timeLeft <= 6 ? '#ffff00' : '#00ff88'
  const timerShadow = isCritical
    ? '0 0 10px #ff4444, 0 0 20px #ff4444'
    : timeLeft <= 6
      ? '0 0 8px #ffff00'
      : '0 0 8px #00ff88'

  return (
    <div
      className="border-2 border-neon-cyan rounded-lg p-6 max-w-2xl w-full"
      style={{ boxShadow: '0 0 20px rgba(0,255,255,0.1)' }}
    >
      {/* ── Chad Mode timer UI ── */}
      {isChad && (
        <div className="mb-4">
          {/* Countdown number */}
          <div className="flex justify-between items-center mb-2">
            <span
              className="font-arcade text-xs"
              style={{ color: '#ff4444', textShadow: '0 0 8px #ff4444', fontSize: '0.6rem' }}
            >
              ☠ CHAD MODE
            </span>
            <span
              className="font-arcade text-sm"
              style={{
                color: timerColor,
                textShadow: timerShadow,
                // Pulse animation on critical seconds
                animation: isCritical && !selected ? 'flicker 0.5s infinite' : 'none',
              }}
            >
              {selected === '__timeout__' ? 'TIME!' : `${timeLeft}s`}
            </span>
          </div>

          {/* Timer bar track */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${timerPercent}%`,
                background: timerColor,
                boxShadow: timerShadow,
                // Snap to 0 instantly on timeout, smooth otherwise
                transition: timeLeft === 0 ? 'none' : 'width 1s linear, background 0.3s, box-shadow 0.3s',
              }}
            />
          </div>
        </div>
      )}

      {/* ── Question content (unchanged) ── */}
      <p className="font-arcade text-neon-pink text-xs mb-2 leading-relaxed">
        {decode(question.category)}
      </p>
      <p className="text-sm leading-relaxed text-white mb-6">
        {decode(question.question)}
      </p>
      <div className="flex flex-col gap-3">
        {answers.map((answer) => (
          <AnswerButton
            key={answer}
            label={decode(answer)}
            onClick={() => handleAnswer(answer)}
            state={getState(answer)}
          />
        ))}
      </div>

      {/* Timeout message */}
      {selected === '__timeout__' && (
        <p
          className="font-arcade text-xs text-center mt-4 leading-loose"
          style={{ color: '#ff4444', textShadow: '0 0 8px #ff4444', fontSize: '0.6rem' }}
        >
          OUT OF TIME — THAT'S THE CHAD TAX
        </p>
      )}
    </div>
  )
}

export default QuestionCard