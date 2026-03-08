function AnswerButton({ label, onClick, state = "default" }) {
  const states = {
    default: "border-2 border-white text-white hover:border-neon-cyan hover:text-neon-cyan",
    correct: "border-2 border-neon-green text-neon-green shadow-neon-green",
    incorrect: "border-2 border-neon-pink text-neon-pink shadow-neon-pink",
    disabled: "border-2 border-gray-600 text-gray-600",
  }

  return (
    <button
      onClick={onClick}
      className={`${states[state]} font-arcade text-xs bg-transparent rounded py-3 px-4 w-full transition duration-200`}
    >
      {label}
    </button>
  )
}

export default AnswerButton