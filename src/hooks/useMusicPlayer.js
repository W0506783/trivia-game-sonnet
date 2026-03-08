// src/hooks/useMusicPlayer.js
import { useEffect, useRef, useState } from 'react'

const TRACKS = {
  welcome: '/music/welcome.mp3',
  gameplay: '/music/gameplay.mp3',
}

const FADE_STEPS = 20
const FADE_DURATION = 800  // ms total crossfade time
const VOLUME = 0.4
const STORAGE_KEY = 'trivia_muted'

/**
 * useMusicPlayer
 *
 * Two-track background music manager with crossfade.
 * Designed around the "press start" splash pattern — nudge() is called
 * exactly once on the splash screen click, which satisfies browser autoplay
 * policy and starts the welcome track cleanly.
 *
 * Returns:
 *   isMuted    — boolean
 *   toggleMute — fn()
 *   nudge      — fn() → call once on splash screen click to unlock + start audio
 *   setTrack   — fn('welcome' | 'gameplay') → crossfades to new track
 */
export function useMusicPlayer() {
  const refs = useRef({})             // { welcome: Audio, gameplay: Audio }
  const activeTrack = useRef('welcome')
  const hasStarted = useRef(false)

  const [isMuted, setIsMuted] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
  })

  // ── Create both audio elements once on mount ───────────────────────────────
  useEffect(() => {
    const welcome = new Audio(TRACKS.welcome)
    const gameplay = new Audio(TRACKS.gameplay)

    welcome.loop = true
    gameplay.loop = true
    welcome.volume = VOLUME
    gameplay.volume = 0        // silent until crossfaded in
    welcome.muted = isMuted
    gameplay.muted = isMuted

    refs.current = { welcome, gameplay }

    return () => {
      welcome.pause(); welcome.src = ''
      gameplay.pause(); gameplay.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Keep mute synced to both elements ─────────────────────────────────────
  useEffect(() => {
    const { welcome, gameplay } = refs.current
    if (welcome) welcome.muted = isMuted
    if (gameplay) gameplay.muted = isMuted
    try { localStorage.setItem(STORAGE_KEY, String(isMuted)) } catch { }
  }, [isMuted])

  // ── crossfade(outgoing, incoming) ─────────────────────────────────────────
  function crossfade(fadeOut, fadeIn) {
    const interval = FADE_DURATION / FADE_STEPS
    const step = VOLUME / FADE_STEPS
    let count = 0

    const tick = setInterval(() => {
      count++
      if (fadeOut) fadeOut.volume = Math.max(0, VOLUME - step * count)
      if (fadeIn) fadeIn.volume = Math.min(VOLUME, step * count)
      if (count >= FADE_STEPS) {
        clearInterval(tick)
        if (fadeOut) { fadeOut.pause(); fadeOut.volume = 0 }
        if (fadeIn) fadeIn.volume = VOLUME
      }
    }, interval)
  }

  // ── nudge — call exactly once on splash screen click ──────────────────────
  // Starts the welcome track immediately. Subsequent track switches use setTrack.
  const nudge = () => {
    if (hasStarted.current || !refs.current.welcome) return
    hasStarted.current = true

    const toPlay = refs.current[activeTrack.current] || refs.current.welcome
    toPlay.volume = VOLUME
    toPlay.play().catch(() => {
      // Autoplay still blocked — shouldn't happen after a real click
      hasStarted.current = false
    })
  }

  // ── setTrack — crossfades to named track ──────────────────────────────────
  const setTrack = (name) => {
    if (!TRACKS[name] || name === activeTrack.current) return

    const incoming = refs.current[name]
    const outgoing = refs.current[activeTrack.current]
    activeTrack.current = name

    // Audio not unlocked yet — just record which track should play on nudge()
    if (!hasStarted.current || !incoming || !outgoing) return

    incoming.play().catch(() => { })
    crossfade(outgoing, incoming)
  }

  const toggleMute = () => setIsMuted(prev => !prev)

  return { isMuted, toggleMute, nudge, setTrack }
}