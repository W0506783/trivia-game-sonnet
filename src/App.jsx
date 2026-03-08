import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import CategorySelector from './components/CategorySelector'

function App() {
  const [screen, setScreen] = useState('welcome')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState('')

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-6">
      {screen === 'welcome' && (
        <>
          <h1 className="font-arcade text-neon-cyan text-3xl text-center leading-loose animate-flicker"
            style={{ textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff' }}>
            TRIVIA GAME
          </h1>
          <CategorySelector category={category} setCategory={setCategory} />
          <Button label="BEGIN" color="green" size="lg" onClick={() => setScreen('playing')} />
        </>
      )}
      {screen === 'playing' && (
        <h2 className="font-arcade text-neon-pink text-xl">Game Screen Coming Soon</h2>
      )}
      {screen === 'results' && (
        <h2 className="font-arcade text-neon-yellow text-xl">Results Screen Coming Soon</h2>
      )}
    </div>
  )
}

export default App