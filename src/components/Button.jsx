function Button({ label, onClick, color = "cyan", size = "md" }) {
  const colors = {
    cyan: "border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black shadow-neon-cyan",
    pink: "border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black shadow-neon-pink",
    green: "border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black shadow-neon-green",
  }

  const sizes = {
    sm: "py-1 px-4 text-xs",
    md: "py-2 px-6 text-sm",
    lg: "py-3 px-8 text-sm",
  }

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} ${sizes[size]} font-arcade bg-transparent rounded transition duration-200`}
    >
      {label}
    </button>
  )
}

export default Button