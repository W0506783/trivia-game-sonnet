import { useState, useMemo } from 'react'
import AnswerButton from './AnswerButton'

const decode = (str) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = str
  return txt.value
}
function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  const answers = useMemo(() => {
    const all = [...question.incorrect_answers, question.correct_answer]
    // eslint-disable-next-line
    return all.sort(() => Math.random() - 0.5)
  }, [question])

  const handleAnswer = (answer) => {
    if (selected) return
    setSelected(answer)
    onAnswer(answer === question.correct_answer)
  }

  const getState = (answer) => {
    if (!selected) return "default"
    if (answer === question.correct_answer) return "correct"
    if (answer === selected) return "incorrect"
    return "disabled"
  }

  return (
    <div className="border-2 border-neon-cyan rounded-lg p-6 max-w-2xl w-full"
      style={{ boxShadow: '0 0 20px rgba(0,255,255,0.1)' }}>
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
    </div>
  )
}

export default QuestionCard