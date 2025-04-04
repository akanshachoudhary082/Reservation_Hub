// src/components/ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details or send to an error tracking service
    console.log("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can customize this fallback UI as needed
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
