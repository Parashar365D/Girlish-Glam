import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    cartItems : [],
    isLoading : false
}

export const addToCart = createAsyncThunk('cart/addToCart', 
    async({userId, productId, quantity})=>{
        const response = await axios.post(`${API}/cart/add-cart`, {userId, productId, quantity});
        return response.data
    })

export const updateInCart = createAsyncThunk('cart/updateInCart', 
    async({userId, productId, quantity})=>{
        const response = await axios.put(`${API}/cart/update-cart`, {userId, productId, quantity});
        return response.data
    })

export const fetchCart = createAsyncThunk('cart/fetchCart', 
    async(userId)=>{
        const response = await axios.get(`${API}/cart/fetch-cart/${userId}`);
        return response.data
    })

export const removeFromCart = createAsyncThunk('cart/removeFromCart', 
    async({userId, productId})=>{
        const response = await axios.delete(`${API}/cart/remove-cart/${userId}/${productId}`);
        return response.data
        
    })

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })

            .addCase(updateInCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateInCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateInCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })

            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })

            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(removeFromCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            });
    },
});

export default shoppingCartSlice.reducer;