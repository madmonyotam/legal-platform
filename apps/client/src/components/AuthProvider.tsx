import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { token, validate, isAuthenticated } = useAuth(); 
    const hasValidated = useRef(false);
    
    useEffect(() => {
      // בדיקה אם טוקן תקף במקרה שמשתמש אינו מחובר
      if (token && !isAuthenticated && !hasValidated.current) {
        console.log('🔄 Running token validation...');
        hasValidated.current = true;
        validate(token);
      }
      
      // איפוס כשאין טוקן
      if (!token) {
        hasValidated.current = false;
      }
    }, [token, isAuthenticated]); // הסרנו את validate מה-dependency array

    return <>{children}</>;
};