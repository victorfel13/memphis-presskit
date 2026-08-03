/** Duración máxima de vista previa por pista (segundos) */
export const PREVIEW_SECONDS = 20

export type PreviewEndKind = 'stream-more' | 'coming-soon'

export function previewEndKindForTrack(trackId: string): PreviewEndKind {
  return trackId === 'overdooze' ? 'stream-more' : 'coming-soon'
}
