import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

interface RouterWrapperProps {
  children: React.ReactNode;
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({ children }) => {
  // Check if we're in development or if browser routing is supported
  const useHashRouter = () => {
    // Use hash router if:
    // 1. We're in a subdirectory deployment
    // 2. The server doesn't support history API fallback
    // 3. We detect we're getting 404s (this is harder to detect automatically)
    
    // For now, always try BrowserRouter first
    // You can change this to HashRouter if the server configuration fails
    return false;
  };

  if (useHashRouter()) {
    return <HashRouter>{children}</HashRouter>;
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default RouterWrapper;
