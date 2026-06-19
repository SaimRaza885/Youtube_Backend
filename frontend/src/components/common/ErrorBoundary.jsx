import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <AlertTriangle className="w-14 h-14 text-text-tertiary/40 mb-4" strokeWidth={1.5} />
          <p className="text-text-tertiary text-lg font-medium mb-1">Something went wrong</p>
          <p className="text-text-tertiary/60 text-sm mb-6">An unexpected error occurred loading this section</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
