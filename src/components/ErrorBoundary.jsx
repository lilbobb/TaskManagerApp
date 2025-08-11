import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="flex p-4 text-red-500 text-center">Something went wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
