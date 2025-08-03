import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

// User type definition
interface User {
    uid: string;
    email: string;
    role: string;
    officeId: string;
}

// State type definition
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            const { token } = response.data;

            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));

            return {
                token,
                user: {
                    uid: payload.uid,
                    email: payload.email,
                    role: payload.role,
                    officeId: payload.officeId
                }
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const validateToken = createAsyncThunk(
    'auth/validate',
    async (token: string, { rejectWithValue }) => {
        try {
            await api.post('/auth/validate', { token });

            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            return {
                user: {
                    uid: payload.uid,
                    email: payload.email,
                    role: payload.role,
                    officeId: payload.officeId
                }
            };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Token validation failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            return true; // מחזיר שהפעולה הצליחה
        } catch (error: any) {
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);

//createSlice for auth
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reducers sync
        clearError: (state) => {
            state.error = null;
        },
        resetAuth: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login User Cases
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoading = false;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Validate Token Cases
            .addCase(validateToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(validateToken.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem('token');
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = null;
                state.isLoading = false;
                localStorage.removeItem('token');
            })
    }
});

// Export actions
export const { clearError, resetAuth } = authSlice.actions;

// Export reducer
export default authSlice.reducer;