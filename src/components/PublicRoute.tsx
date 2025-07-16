import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean; // If true, authenticated users will be redirected
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('PublicRoute - Auth state:', { isAuthenticated, loading, path: location.pathname });
  }, [isAuthenticated, loading, location]);

  if (loading) {
    console.log('PublicRoute - Loading state');
    return <div>Loading...</div>;
  }

  // If route is restricted and user is authenticated, redirect to dashboard
  if (restricted && isAuthenticated) {
    console.log('PublicRoute - Authenticated user accessing restricted route, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('PublicRoute - Access granted');
  return <>{children}</>;
};

export default PublicRoute; 