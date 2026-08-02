import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { PageTransition } from '../components/shared/PageTransition'

type NavigationContextValue = {
  navigateTo: (sectionId: string) => void
  isTransitioning: boolean
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

type NavigationProviderProps = {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const targetRef = useRef<string | null>(null)
  const [active, setActive] = useState(false)

  const finishTransition = useCallback(() => {
    setActive(false)
    targetRef.current = null
  }, [])

  const handleMidpoint = useCallback(() => {
    const target = targetRef.current
    if (target) scrollToSection(target)
  }, [])

  const navigateTo = useCallback(
    (sectionId: string) => {
      if (active) return

      if (!document.getElementById(sectionId)) return

      if (prefersReducedMotion()) {
        scrollToSection(sectionId)
        return
      }

      targetRef.current = sectionId
      setActive(true)
    },
    [active],
  )

  const value = useMemo(
    () => ({
      navigateTo,
      isTransitioning: active,
    }),
    [navigateTo, active],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
      <PageTransition active={active} onMidpoint={handleMidpoint} onComplete={finishTransition} />
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation debe usarse dentro de NavigationProvider')
  return ctx
}
