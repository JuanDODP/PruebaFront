import { keyframes } from '@mui/material/styles'

// Curvas y duraciones compartidas para que todas las animaciones se sientan iguales
export const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const DURATION = {
  fast: 200,
  base: 300,
  slow: 500,
}

export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

export const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
  70% { box-shadow: 0 0 0 6px transparent; opacity: 0.9; }
  100% { box-shadow: 0 0 0 0 transparent; opacity: 1; }
`

// Escalona la entrada de elementos de una lista sin que los últimos esperen demasiado
export const staggerDelay = (index: number, step = 50, max = 600) => `${Math.min(index * step, max)}ms`

export const REDUCED_MOTION = '@media (prefers-reduced-motion: reduce)'
