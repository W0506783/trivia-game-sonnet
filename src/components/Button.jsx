function Button({ label, onClick, color = "blue", size = "md" }) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
  }

  const sizes = {
    sm: "py-1 px-4 text-sm",
    md: "py-2 px-6 text-base",
    lg: "py-3 px-8 text-lg",
  }

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} ${sizes[size]} text-white font-bold rounded-lg shadow-md transition duration-200`}
    >
      {label}
    </button>
  )
}

export default Button