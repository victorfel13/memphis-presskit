import { Box, type BoxProps } from '@mui/material'
import { pageContentClass, pageContentSx, sectionWrapSx } from '../../theme/brand'

type PageContentProps = BoxProps & {
  /** Sección con padding vertical estándar */
  section?: boolean
}

/** Contenedor con márgenes horizontales vía CSS (`.page-content`) */
export function PageContent({ section = false, sx, className, ...props }: PageContentProps) {
  const baseSx = section ? sectionWrapSx : pageContentSx
  const classes = className ? `${pageContentClass} ${className}` : pageContentClass

  return (
    <Box
      className={classes}
      sx={[baseSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      {...props}
    />
  )
}
