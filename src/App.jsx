// App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import CategorySelector from './components/CategorySelector'
import DifficultySelector from './components/DifficultySelector'
import AmountSelector from './components/AmountSelector'
import QuestionCard from './components/QuestionCard'
import HighScoreTable from './components/HighScoreTable'
import NameEntry from './components/NameEntry'
import MuteButton from './components/MuteButton'
import { useHighScores } from './hooks/useHighScores'
import { useMusicPlayer } from './hooks/useMusicPlayer'

function App() {
  // 'splash' is the new initial screen — one click unlocks audio then goes to 'welcome'
  const [screen, setScreen] = useState('splash')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const { scores, addScore, clearScores, isHighScore } = useHighScores()
  const { isMuted, toggleMute, nudge, setTrack } = useMusicPlayer()

  // ── Switch tracks based on screen ─────────────────────────────────────────
  useEffect(() => {
    if (screen === 'welcome' || screen === 'highScores' || screen === 'splash') {
      setTrack('welcome')
    } else {
      setTrack('gameplay')
    }
  }, [screen]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Splash screen handler — the ONE place nudge() is called ───────────────
  const handleSplashClick = () => {
    nudge()              // unlocks browser autoplay, starts welcome.mp3 immediately
    setScreen('welcome') // transition happens after audio is already playing
  }

  // ── Mute toggle (nudge not needed here — audio already unlocked post-splash) 
  const handleMuteToggle = () => toggleMute()

  // ── Derived ────────────────────────────────────────────────────────────────
  const isChad = difficulty === 'chad'

  // ── Game logic ─────────────────────────────────────────────────────────────
  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(prev => prev + 1)
    setAnswered(true)
  }

  const handleTimeout = () => {
    setTimeout(() => {
      setAnswered(false)
      if (currentIndex + 1 >= questions.length) {
        setScreen('results')
      } else {
        setCurrentIndex(i => i + 1)
      }
    }, 1800)
  }

  const handleNext = () => {
    setAnswered(false)
    if (currentIndex + 1 >= questions.length) {
      setScreen('results')
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const fetchQuestions = async () => {
    setLoading(true)
    const categoryParam = category ? `&category=${category}` : ''
    const apiDifficulty = isChad ? 'hard' : difficulty
    const difficultyParam = apiDifficulty ? `&difficulty=${apiDifficulty}` : ''
    const url = `https://opentdb.com/api.php?amount=${amount || 10}&type=multiple${categoryParam}${difficultyParam}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setQuestions(data.results)
      setCurrentIndex(0)
      setScore(0)
      setAnswered(false)
      setScreen('playing')
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }

  // ── Results helpers ────────────────────────────────────────────────────────
  const currentPercent = questions.length > 0
    ? Math.round((score / questions.length) * 100)
    : 0

  const handleFinishResults = () => {
    if (isHighScore(currentPercent)) {
      setScreen('nameEntry')
    } else {
      setScreen('welcome')
    }
  }

  const handleSaveName = (name) => {
    addScore({ name, score, total: questions.length, difficulty })
    setScreen('highScores')
  }

  const handleSkipName = () => setScreen('welcome')

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-6">

      <MuteButton isMuted={isMuted} onToggle={handleMuteToggle} />

      {/* ── SPLASH ────────────────────────────────────────────────── */}
      {screen === 'splash' && (
        <div
          className="flex flex-col items-center gap-12 cursor-pointer select-none"
          onClick={handleSplashClick}
        >
          <h1
            className="font-arcade text-neon-cyan text-3xl text-center leading-loose animate-flicker"
            style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 60px #00ffff' }}
          >
            TRIVIA
            <br />
            GAME
          </h1>

          <p
            className="font-arcade text-neon-yellow text-sm text-center leading-loose"
            style={{
              textShadow: '0 0 10px #ffff00',
              animation: 'flicker 1s infinite',
            }}
          >
            CLICK TO CONTINUE
          </p>
        </div>
      )}

      {/* ── WELCOME ───────────────────────────────────────────────── */}
      {screen === 'welcome' && (
        <>
          <h1
            className="font-arcade text-neon-cyan text-3xl text-center leading-loose animate-flicker"
            style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}
          >
            TRIVIA GAME
          </h1>

          <div className="flex flex-col items-center gap-3">
            <p
              className="font-arcade text-neon-green text-xs text-center leading-loose"
              style={{ textShadow: '0 0 8px #ffff00' }}
            >
              QUESTION SETTINGS
              <br />
              <span className="text-red-400" style={{ fontSize: '0.6rem' }}>
                (OR HIT BEGIN FOR RANDOM QUIZ)
              </span>
            </p>
            <CategorySelector category={category} setCategory={setCategory} />
            <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            <AmountSelector amount={amount} setAmount={setAmount} />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              label={loading ? 'LOADING...' : 'BEGIN'}
              color="green"
              size="lg"
              onClick={fetchQuestions}
            />
            <Button
              label="HIGH SCORES"
              color="cyan"
              size="md"
              onClick={() => setScreen('highScores')}
            />
          </div>
        </>
      )}

      {/* ── PLAYING ───────────────────────────────────────────────── */}
      {screen === 'playing' && (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
          <div className="flex items-center gap-6">
            <p className="font-arcade text-neon-green text-xs">
              QUESTION {currentIndex + 1} OF {questions.length}
            </p>
            {isChad && (
              <p
                className="font-arcade text-xs animate-flicker"
                style={{ color: '#ff4444', textShadow: '0 0 8px #ff4444', fontSize: '0.55rem' }}
              >
                ☠ CHAD MODE
              </p>
            )}
          </div>

          <QuestionCard
            key={currentIndex}
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            isChad={isChad}
            onTimeout={handleTimeout}
          />

          {answered && !isChad && (
            <Button
              label={currentIndex + 1 >= questions.length ? 'FINISH' : 'NEXT'}
              color="cyan"
              size="lg"
              onClick={handleNext}
            />
          )}
          {answered && isChad && (
            <Button
              label={currentIndex + 1 >= questions.length ? 'FINISH' : 'NEXT →'}
              color="cyan"
              size="lg"
              onClick={handleNext}
            />
          )}
        </div>
      )}

      {/* ── RESULTS ───────────────────────────────────────────────── */}
      {screen === 'results' && (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-4">
          <h2
            className="font-arcade text-neon-cyan text-2xl text-center leading-loose animate-flicker"
            style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}
          >
            GAME OVER
          </h2>

          {isChad && (
            <p
              className="font-arcade text-xs animate-flicker"
              style={{ color: '#ff4444', textShadow: '0 0 10px #ff4444', fontSize: '0.6rem' }}
            >
              ☠ YOU SURVIVED CHAD MODE ☠
            </p>
          )}

          <div
            className="border-2 border-neon-cyan rounded-lg p-8 w-full text-center"
            style={{ boxShadow: '0 0 20px rgba(0,255,255,0.1)' }}
          >
            <p className="font-arcade text-neon-green text-sm mb-4 leading-loose">
              YOU SCORED
            </p>
            <p
              className="font-arcade text-neon-yellow text-4xl mb-4"
              style={{ textShadow: '0 0 10px #ffff00, 0 0 20px #ffff00' }}
            >
              {score}/{questions.length}
            </p>
            <p
              className="font-arcade text-neon-pink text-sm"
              style={{ textShadow: '0 0 10px #ff00ff' }}
            >
              {currentPercent}%
            </p>

            {isHighScore(currentPercent) && (
              <p
                className="font-arcade text-neon-yellow text-xs mt-6 animate-flicker leading-loose"
                style={{ textShadow: '0 0 8px #ffff00', fontSize: '0.6rem' }}
              >
                ★ NEW HIGH SCORE ELIGIBLE ★
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              label={isHighScore(currentPercent) ? 'SAVE SCORE' : 'PLAY AGAIN'}
              color="green"
              size="lg"
              onClick={handleFinishResults}
            />
            {isHighScore(currentPercent) && (
              <Button label="SKIP" color="pink" size="sm" onClick={handleSkipName} />
            )}
            {!isHighScore(currentPercent) && (
              <Button
                label="HIGH SCORES"
                color="cyan"
                size="md"
                onClick={() => setScreen('highScores')}
              />
            )}
          </div>
        </div>
      )}

      {/* ── NAME ENTRY ────────────────────────────────────────────── */}
      {screen === 'nameEntry' && (
        <NameEntry
          score={score}
          total={questions.length}
          difficulty={difficulty}
          onSave={handleSaveName}
          onSkip={handleSkipName}
        />
      )}

      {/* ── HIGH SCORES ───────────────────────────────────────────── */}
      {screen === 'highScores' && (
        <HighScoreTable
          scores={scores}
          onBack={() => setScreen('welcome')}
          onClear={clearScores}
        />
      )}

    </div>
  )
}

export default App