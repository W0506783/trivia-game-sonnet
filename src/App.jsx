import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import CategorySelector from './components/CategorySelector'
import DifficultySelector from './components/DifficultySelector'
import AmountSelector from './components/AmountSelector'
import QuestionCard from './components/QuestionCard'

function App() {
  const [screen, setScreen] = useState('welcome')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [difficulty, setDifficulty] = useState('')
  const [amount, setAmount] = useState('')
  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
  }

  const fetchQuestions = async () => {
    setLoading(true)
    const categoryParam = category ? `&category=${category}` : ''
    const difficultyParam = difficulty ? `&difficulty=${difficulty}` : ''
    const url = `https://opentdb.com/api.php?amount=${amount || 10}&type=multiple${categoryParam}${difficultyParam}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setQuestions(data.results)
      setCurrentIndex(0)
      setScore(0)
      setScreen('playing')
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-6">
      {screen === 'welcome' && (
        <>
          <h1 className="font-arcade text-neon-cyan text-3xl text-center leading-loose animate-flicker"
            style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}>
            TRIVIA GAME
          </h1>
          <div className="flex flex-col items-center gap-3">
            <p className="font-arcade text-neon-green text-xs text-center leading-loose"
              style={{ textShadow: '0 0 8px #ffff00' }}>
              QUESTION SETTINGS
              <br />
              <span className="text-red-400" style={{ fontSize: '0.6rem' }}>(OR HIT BEGIN FOR RANDOM QUIZ)</span>
            </p>
            <CategorySelector category={category} setCategory={setCategory} />
            <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            <AmountSelector amount={amount} setAmount={setAmount} />
          </div>
          <Button
            label={loading ? "LOADING..." : "BEGIN"}
            color="green"
            size="lg"
            onClick={fetchQuestions}
          />
        </>
      )}
      {screen === 'playing' && (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
          <p className="font-arcade text-neon-green text-xs">
            QUESTION {currentIndex + 1} OF {questions.length}
          </p>
          <QuestionCard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
          />
        </div>
      )}
      {screen === 'results' && (
        <h2 className="font-arcade text-neon-yellow text-xl">Results Screen Coming Soon</h2>
      )}
    </div>
  )
}

export default App