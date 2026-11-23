import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let readable = error.message || 'An unexpected application error occurred.';
    try {
      const parsed = JSON.parse(error.message);
      if (parsed && parsed.error && parsed.operationType) {
        readable = `Database access error (${parsed.operationType} on ${parsed.path || 'record'}): ${parsed.error}`;
      }
    } catch {
      // Standard error message
    }
    return { hasError: true, message: readable };
  }

  componentDidCatch(error: Error) {
    console.error('Tourism 360 ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F9FBF9] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-emerald-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 text-orange-600 mb-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Something went wrong
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: '' });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reload Tourism 360
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
