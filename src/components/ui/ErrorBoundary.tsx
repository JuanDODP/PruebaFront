import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorFallback } from './ErrorFallback'

interface ErrorBoundaryProps {
  children: ReactNode
  // Cuando cambia (ej. la ruta actual) el boundary se reinicia automáticamente
  resetKey?: unknown
  fullScreen?: boolean
  // Punto de integración para un servicio de monitoreo (Sentry, Datadog, etc.)
  onError?: (error: Error, info: ErrorInfo) => void
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Atrapa errores de render en sus hijos para que un fallo no deje la app en blanco.
 * React solo permite implementarlo como componente de clase.
 * También cubre fallos al descargar una página lazy (ej. sin conexión).
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) this.reset()
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (error) return <ErrorFallback error={error} onReset={this.reset} fullScreen={this.props.fullScreen} />
    return this.props.children
  }
}
