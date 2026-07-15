declare module '@9am/fire-flame-react' {
  import type { ComponentProps, Ref } from 'react'

  export type FireFlameOption = {
    painter?: 'canvas' | 'svg'
    w?: number
    h?: number
    x?: number
    y?: number
    mousemove?: boolean
    fps?: number
    particleNum?: number
    particleDistance?: number
    particleFPS?: number
    innerColor?: string
    outerColor?: string
    friction?: number
  }

  type FireFlameProps = {
    option?: FireFlameOption
    children?: React.ReactNode
  }

  export const FireFlame: React.ForwardRefExoticComponent<
    FireFlameProps & React.RefAttributes<unknown>
  >
}
