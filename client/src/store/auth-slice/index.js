import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token:null,
};

export const registerUser = createAsyncThunk('auth/signup',
    async (formData) => {
        const response = await axios.post(`${API}/user/signup`, formData, { withCredentials: true });
        return response.data;
    }
);
export const loginUser = createAsyncThunk('auth/login',
    async (formData) => {
        const response = await axios.post(`${API}/user/login`, formData, { withCredentials: true });
        return response.data;
    }
);

export const logoutUser = createAsyncThunk('auth/logout', 
    async () => {
    const response = await axios.post(`${API}/user/logout`, {}, { withCredentials: true });
    return response.data;
});

export const checkAuth = createAsyncThunk('auth/checkauth',
    async (token) => {
    const response = await axios.get(`${API}/user/checkauth`, {
        headers: {
            Authorization : `Bearer ${token}`,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => { },
        resetToken : (state)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.token = action.payload.authtoken;
                sessionStorage.setItem('token', JSON.stringify(action.payload.authtoken));
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
            })
            
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.token = action.payload.authtoken;
                sessionStorage.setItem('token', JSON.stringify(action.payload.authtoken));
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
            })

            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.success ? action.payload.user : null;
                
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    }
});

export const { setUser , resetToken} = authSlice.actions;
export default authSlice.reducer;