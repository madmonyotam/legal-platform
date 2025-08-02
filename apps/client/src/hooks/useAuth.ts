import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { loginUser, validateToken, logoutUser, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // בחירת נתונים מה-store
  const { 
    isAuthenticated, 
    user, 
    token, 
    isLoading, 
    error 
  } = useSelector((state: RootState) => state.auth);

  // פונקציות נוחות
  const login = (credentials: { email: string; password: string }) => {
    dispatch(loginUser(credentials));
  };

  const validate = (token: string) => {
    dispatch(validateToken(token));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // מצב
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    
    // פונקציות
    login,
    validate,
    logout,
    clearAuthError,
  };
};




