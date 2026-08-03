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
import {
  PREVIEW_SECONDS,
  previewEndKindForTrack,
  type PreviewEndKind,
} from '../constants/preview'

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
  previewEnded: boolean
  previewEndKind: PreviewEndKind | null
  previewLimit: number
  audioRef: RefObject<HTMLAudioElement | null>
  playTrack: (track: PlayerTrack) => void
  openSpotify: (url: string) => void
  pauseAudio: () => void
  onAudioPlay: () => void
  onAudioPause: () => void
  onAudioEnded: () => void
  resetPreview: () => void
}

const PlaybackContext = createContext<PlaybackContextValue | null>(null)

type PlaybackProviderProps = {
  children: ReactNode
}

export function PlaybackProvider({ children }: PlaybackProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState<PlayerTrack | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [previewEnded, setPreviewEnded] = useState(false)
  const [previewEndKind, setPreviewEndKind] = useState<PreviewEndKind | null>(null)

  const resetPreview = useCallback(() => {
    setPreviewEnded(false)
    setPreviewEndKind(null)
  }, [])

  const endPreview = useCallback((trackId: string) => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = PREVIEW_SECONDS
    }
    setPlayingId(null)
    setPreviewEnded(true)
    setPreviewEndKind(previewEndKindForTrack(trackId))
  }, [])

  const playTrack = useCallback(
    (track: PlayerTrack) => {
      if (current?.id === track.id) {
        if (!track.audioSrc) return
        const audio = audioRef.current
        if (!audio) return

        if (audio.paused) {
          if (previewEnded || audio.currentTime >= PREVIEW_SECONDS) {
            audio.currentTime = 0
            resetPreview()
          }
          void audio.play()
        } else {
          audio.pause()
        }
        return
      }

      resetPreview()
      setCurrent(track)
    },
    [current?.id, previewEnded, resetPreview],
  )

  useEffect(() => {
    if (!current?.audioSrc) return
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    resetPreview()
    void audio.play().catch(() => {})
  }, [current?.id, current?.audioSrc, resetPreview])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !current?.audioSrc) return

    const onTimeUpdate = () => {
      if (audio.currentTime >= PREVIEW_SECONDS) {
        endPreview(current.id)
      }
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    return () => audio.removeEventListener('timeupdate', onTimeUpdate)
  }, [current?.id, current?.audioSrc, endPreview])

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
    if (current) endPreview(current.id)
    else setPlayingId(null)
  }, [current, endPreview])

  const value = useMemo(
    () => ({
      current,
      playingId,
      previewEnded,
      previewEndKind,
      previewLimit: PREVIEW_SECONDS,
      audioRef,
      playTrack,
      openSpotify,
      pauseAudio,
      onAudioPlay,
      onAudioPause,
      onAudioEnded,
      resetPreview,
    }),
    [
      current,
      playingId,
      previewEnded,
      previewEndKind,
      playTrack,
      openSpotify,
      pauseAudio,
      onAudioPlay,
      onAudioPause,
      onAudioEnded,
      resetPreview,
    ],
  )

  return <PlaybackContext.Provider value={value}>{children}</PlaybackContext.Provider>
}

export function usePlayback() {
  const ctx = useContext(PlaybackContext)
  if (!ctx) throw new Error('usePlayback debe usarse dentro de PlaybackProvider')
  return ctx
}
