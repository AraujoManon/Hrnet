import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container error-boundary-container">
          <h1 className="error-boundary-title">
            Oops! Something went wrong
          </h1>
          <p className="error-boundary-message">
            We're sorry for the inconvenience. The application encountered an error.
          </p>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="error-boundary-details">
              <summary className="error-boundary-summary">
                Error details (development only)
              </summary>
              <p className="error-boundary-error-text">
                {this.state.error.toString()}
              </p>
              <p className="error-boundary-stack">
                {this.state.errorInfo.componentStack}
              </p>
            </details>
          )}
          
          <div className="error-boundary-button-container">
            <button 
              onClick={function() { window.location.href = '/'; }}
              className="error-boundary-reload-button"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;