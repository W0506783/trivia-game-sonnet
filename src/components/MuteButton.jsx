// src/components/MuteButton.jsx
function MuteButton({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={isMuted ? 'Unmute music' : 'Mute music'}
      className="fixed top-4 right-4 z-50 bg-transparent border border-neon-cyan rounded-lg
                 w-10 h-10 flex items-center justify-center
                 transition-all duration-200
                 hover:bg-neon-cyan hover:bg-opacity-10"
      style={{ boxShadow: isMuted ? 'none' : '0 0 8px rgba(0,255,255,0.3)' }}
    >
      <span
        className="text-lg leading-none"
        style={{ filter: isMuted ? 'grayscale(1) opacity(0.4)' : 'none' }}
      >
        {isMuted ? '🔇' : '🔊'}
      </span>
    </button>
  )
}

export default MuteButton