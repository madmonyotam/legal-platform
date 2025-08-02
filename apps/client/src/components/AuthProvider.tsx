import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { token, validate, isAuthenticated } = useAuth(); 
    useEffect(() => {
      // בדיקה אם טוקן תקף במקרה שמשתמש אינו מחובר
      if (token && !isAuthenticated) {
        validate(token);
      }
    }, [token, isAuthenticated, validate]);

    return <>{children}</>;
};