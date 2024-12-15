import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_URI;

const initialState = {
    isLoading: false,
    orderId: null,
    razorpayOrderId: null,
    status: "idle",
    orderList: [],
    orderDetails: null,
};

export const createNewOrder = createAsyncThunk('order/createNewOrder',
    async (orderData) => {
        const response = await axios.post(`${API}/order/create-order`, orderData);
        return response.data;
    });

export const capturePayment = createAsyncThunk('order/capturePayment',
    async ({ paymentId, orderId, paymentSignature }) => {
        const response = await axios.post(`${API}/order/capture-payment`, { paymentId, orderId, paymentSignature, });
        return response.data;
    });

export const getAllOrders = createAsyncThunk('order/getAllOrders',
    async (userId) => {
        const response = await axios.get(`${API}/order/get-order/${userId}`);
        return response.data;
    });

export const getOrderDetails = createAsyncThunk('order/getOrderDetails',
    async (id) => {
        const response = await axios.get(`${API}/order/order-details/${id}`,);
        return response.data;
    });

const OrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.razorpayOrderId = action.payload.razorpayOrderId;
                state.orderId = action.payload.orderId;
                state.isLoading = false;
            })
            .addCase(createNewOrder.rejected, (state) => {
                state.razorpayOrderId = null;
                state.orderId = null;
                state.isLoading = false;
            })

            .addCase(capturePayment.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(capturePayment.fulfilled, (state) => {
                state.status = "succeeded";
                state.isLoading = false;
            })
            .addCase(capturePayment.rejected, (state) => {
                state.status = "failed";
                state.isLoading = false;
            })

            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            });
    },
});

export default OrdersSlice.reducer;