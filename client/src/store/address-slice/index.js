import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    addressList : [],
    isLoading : false
}

export const addAddress = createAsyncThunk('account/addAddress', 
    async(formData)=>{
        const response = await axios.post(`${API}/address/add-address`, formData);
        return response.data
    })

export const updateAddress = createAsyncThunk('account/updateAddress', 
    async({userId, addressId, formData})=>{
        const response = await axios.put(`${API}/address/update-address/${userId}/${addressId}`, formData);
        return response.data
    })

export const fetchAddress = createAsyncThunk('account/fetchAddress', 
    async(userId)=>{
        const response = await axios.get(`${API}/address/fetch-address/${userId}`);
        return response.data
    })

export const removeAddress = createAsyncThunk('account/removeAddress', 
    async({userId, addressId})=>{
        const response = await axios.delete(`${API}/address/remove-address/${userId}/${addressId}`);
        return response.data  
    })

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addAddress.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(updateAddress.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(fetchAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })

            .addCase(removeAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(removeAddress.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default addressSlice.reducer;