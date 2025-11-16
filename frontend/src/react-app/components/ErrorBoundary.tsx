import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl w-full bg-white border border-gray-200 rounded-xl p-6">
            <h1 className="text-xl font-bold text-red-600 mb-2">Terjadi kesalahan saat memuat halaman</h1>
            <p className="text-gray-700 mb-4">Silakan muat ulang halaman. Jika masalah berlanjut, hubungi pengelola.</p>
            {import.meta.env.DEV && this.state.error && (
              <>
                <pre className="text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-auto mb-3">
                  {this.state.error.toString()}
                </pre>
                {this.state.error.stack && (
                  <pre className="text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                )}
              </>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
