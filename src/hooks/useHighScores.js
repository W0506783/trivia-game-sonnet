// src/hooks/useHighScores.js
import { useState } from 'react'

const STORAGE_KEY = 'trivia_high_scores'
const MAX_SCORES = 10

/**
 * useHighScores — manages high score persistence via localStorage.
 *
 * Returns:
 *   scores       — sorted array of score objects: { name, score, total, percent, difficulty, date }
 *   addScore     — fn(scoreObj) → saves a new score, returns updated array
 *   clearScores  — fn() → wipes all saved scores (for testing/reset)
 *   isHighScore  — fn(percent) → true if this score would make the top 10
 */
export function useHighScores() {
  const [scores, setScores] = useState(() => loadScores())

  function addScore({ name, score, total, difficulty }) {
    const entry = {
      name: name.toUpperCase().trim().slice(0, 12), // cap name at 12 chars, arcade style
      score,
      total,
      percent: Math.round((score / total) * 100),
      difficulty: difficulty || 'any',
      date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
    }

    const updated = [...scores, entry]
      .sort((a, b) => b.percent - a.percent || b.score - a.score)
      .slice(0, MAX_SCORES)

    saveScores(updated)
    setScores(updated)
    return updated
  }

  function clearScores() {
    saveScores([])
    setScores([])
  }

  function isHighScore(percent) {
    if (scores.length < MAX_SCORES) return true
    return percent > scores[scores.length - 1].percent
  }

  return { scores, addScore, clearScores, isHighScore }
}

// ─── helpers (module-scoped, not exported) ───────────────────────────────────

function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveScores(scores) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch (e) {
    console.warn('Could not save high scores to localStorage:', e)
  }
}