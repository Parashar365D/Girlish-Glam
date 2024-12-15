import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    isLoading: false,
    reviewList: [],
};

export const addProductReview = createAsyncThunk('review/addProductReview',
    async (formData) => {
        const response = await axios.post(`${API}/review/add-review`, formData);
        return response.data;
    });

export const getProductReview = createAsyncThunk('review/getProductReview',
    async (productId) => {
        const response = await axios.get(`${API}/review/${productId}`);
        return response.data;
    });

const ReviewSlice = createSlice({
    name: 'Review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviewList = action.payload.data;
            })
            .addCase(getProductReview.rejected, (state) => {
                state.isLoading = false;
                state.reviewList = [];
            });
    },
});

export default ReviewSlice.reducer;