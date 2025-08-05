import { useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { token, validate, isAuthenticated, logout } = useAuth(); 
    const hasValidated = useRef(false);
    
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      
      // אם אין טוקן ב-localStorage אבל יש ב-Redux - נקה הכל
      if (!storedToken && (token || isAuthenticated)) {
        logout();
        return;
      }
      
      // אם אין טוקן כלל - וודא שלא מחובר
      if (!token && !storedToken && isAuthenticated) {
        logout();
        return;
      }
      
      // בדיקה אם טוקן תקף במקרה שמשתמש אינו מחובר
      if (token && !isAuthenticated && !hasValidated.current) {
        hasValidated.current = true;
        validate(token);
      }
      
      // איפוס כשאין טוקן
      if (!token) {
        hasValidated.current = false;
      }
    }, [token, isAuthenticated, logout]); // הוספנו logout ל-dependency
    
    // מאזין לשינויים ב-localStorage
    useEffect(() => {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'token') {
          // אם הטוקן נמחק אבל המשתמש עדיין מחובר - נתק אותו
          if (!e.newValue && isAuthenticated) {
            logout();
          }
        }
      };
      
      // האזנה לשינויים ב-localStorage (עובד רק בין טאבים)
      window.addEventListener('storage', handleStorageChange);
      
      // בדיקה תקופתית (עובד באותו טאב)
      const checkTokenInterval = setInterval(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken && isAuthenticated) {
          logout();
        }
      }, 1000); // בדיקה כל שנייה
      
      // ניקוי
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(checkTokenInterval);
      };
    }, [isAuthenticated, logout]);

    return <>{children}</>;
};