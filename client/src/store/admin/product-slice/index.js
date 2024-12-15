import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    isLoading: false,
    productList: []
};

export const addProductImage = createAsyncThunk('/product/addProductImage',
    async (formData) => {
        const result = await axios.post(`${API}/admin/products/upload-image`, formData);
        return result.data;
    }
);

export const addNewProduct = createAsyncThunk('/product/addNewProduct',
    async (formData) => {
        const result = await axios.post(`${API}/admin/products/add`, formData, { headers: { "Content-Type": "application/json" } });
        return result.data;
    }
);
export const updateProduct = createAsyncThunk('/product/updateProduct',
    async ({id, formData}) => {
        const result = await axios.put(`${API}/admin/products/update/${id}`, formData, { headers: { "Content-Type": "application/json" } });
        return result.data;
    }
);
export const fetchProduct = createAsyncThunk('/product/fethProduct',
    async () => {
        const result = await axios.get(`${API}/admin/products/fetch`);
        return result.data;
    }
);
export const deleteProduct = createAsyncThunk('/product/deleteProduct',
    async (id) => {
        const result = await axios.delete(`${API}/admin/products/delete/${id}`);
        return result.data;
    }
);

const AdminProductsSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProduct.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(fetchProduct.fulfilled, (state, action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        })
        .addCase(fetchProduct.rejected, (state, action)=>{
            state.isLoading = false
            state.productList = []
        });
    }
});

export default AdminProductsSlice.reducer;