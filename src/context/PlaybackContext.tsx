import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'

/** Tema que el reproductor entiende — lo arma Música al pulsar play */
export type PlayerTrack = {
  id: string
  title: string
  artist: string
  coverSrc?: string
  coverTint: string
  audioSrc?: string
  spotifyUrl?: string
}

type PlaybackContextValue = {
  current: PlayerTrack | null
  playingId: string | null
  audioRef: RefObject<HTMLAudioElement | null>
  playTrack: (track: PlayerTrack) => void
  openSpotify: (url: string) => void
  pauseAudio: () => void
  onAudioPlay: () => void
  onAudioPause: () => void
  onAudioEnded: () => void
}

const PlaybackContext = createContext<PlaybackContextValue | null>(null)

type PlaybackProviderProps = {
  children: ReactNode
}

export function PlaybackProvider({ children }: PlaybackProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState<PlayerTrack | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const playTrack = useCallback(
    (track: PlayerTrack) => {
      if (current?.id === track.id) {
        if (!track.audioSrc) return
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) void audio.play()
        else audio.pause()
        return
      }
      setCurrent(track)
    },
    [current?.id],
  )

  useEffect(() => {
    if (!current?.audioSrc) return
    const audio = audioRef.current
    if (!audio) return
    void audio.play().catch(() => {})
  }, [current?.id, current?.audioSrc])

  const openSpotify = useCallback((url: string) => {
    audioRef.current?.pause()
    setPlayingId(null)
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause()
    setPlayingId(null)
  }, [])

  const onAudioPlay = useCallback(() => {
    setPlayingId(current?.id ?? null)
  }, [current?.id])

  const onAudioPause = useCallback(() => {
    setPlayingId(null)
  }, [])

  const onAudioEnded = useCallback(() => {
    setPlayingId(null)
  }, [])

  const value = useMemo(
    () => ({
      current,
      playingId,
      audioRef,
      playTrack,
      openSpotify,
      pauseAudio,
      onAudioPlay,
      onAudioPause,
      onAudioEnded,
    }),
    [current, playingId, playTrack, openSpotify, pauseAudio, onAudioPlay, onAudioPause, onAudioEnded],
  )

  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>
}

export function usePlayback() {
  const ctx = useContext(PlaybackContext)
  if (!ctx) throw new Error('usePlayback debe usarse dentro de PlaybackProvider')
  return ctx
}
