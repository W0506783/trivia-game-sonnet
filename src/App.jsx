import { useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  const [screen, setScreen] = useState('welcome')
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      {screen === 'welcome' && (
        <>
          <h1 className="text-4xl font-bold">Trivia Game</h1>
          <Button label="Begin" color="green" size="lg" onClick={() => setScreen('playing')} />
        </>
      )}
      {screen === 'playing' && (
        <h2 className="text-2xl">Game Screen Coming Soon</h2>
      )}
      {screen === 'results' && (
        <h2 className="text-2xl">Results Screen Coming Soon</h2>
      )}
    </div>
  )
}

export default App