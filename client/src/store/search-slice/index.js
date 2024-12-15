import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    isLoading: false,
    searchResult : [],
};

export const searchProduct = createAsyncThunk('order/searchProduct',
    async (keyword) => {
        const response = await axios.get(`${API}/search/${keyword}`);
        return response.data;
    });

const SearchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResult = action.payload.data;
            })
            .addCase(searchProduct.rejected, (state) => {
                state.isLoading = false;
                state.searchResult = [];
            });
    },
});

export default SearchSlice.reducer;