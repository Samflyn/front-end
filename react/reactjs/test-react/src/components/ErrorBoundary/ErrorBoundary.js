import React, { Component } from 'react';

// Only class components can be error boundaries.
// Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown.
// Use componentDidCatch() to log error information.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true, errorMessage: error });
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>{this.state.errorMessage}</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
