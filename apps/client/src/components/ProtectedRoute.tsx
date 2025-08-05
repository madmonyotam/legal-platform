import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  } 

  if (!isAuthenticated) {
    // שמירת הנתיב הנוכחי
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
