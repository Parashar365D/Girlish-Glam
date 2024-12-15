import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null,
};

export const getUserAllOrders = createAsyncThunk('adminOrder/getUserAllOrders',
    async () => {
        const response = await axios.get(`${API}/admin/order/user-orders`);
        return response.data;
    });

export const getUserAllOrderDetails = createAsyncThunk('adminOrder/getUserAllOrderDetails',
    async (id) => {
        const response = await axios.get(`${API}/admin/order/details-order/${id}`,);
        return response.data;
    });

export const updateUserOrderStatus = createAsyncThunk('adminOrder/updateUserOrderStatus',
    async ({id, orderStatus}) => {
        const response = await axios.post(`${API}/admin/order/update-order/${id}`, {orderStatus});
        return response.data;
    });

const AdminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getUserAllOrders.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getUserAllOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserAllOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getUserAllOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            });
    },
});

export default AdminOrdersSlice.reducer;