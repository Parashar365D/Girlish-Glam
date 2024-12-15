import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/product-slice";
import shoppingCartSlice from "./cart-slice";
import addressSlice from "./address-slice";
import ordersSlice from "./order-slice";
import AdminOrdersSlice from "./admin/order-slice";
import searchSlice from "./search-slice";
import reviewSlice from "./review-slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: AdminProductsSlice,
        adminOrder: AdminOrdersSlice,
        shoppingCart: shoppingCartSlice,
        address: addressSlice,
        order: ordersSlice,
        search: searchSlice,
        review: reviewSlice,
    }
});

export default store;
