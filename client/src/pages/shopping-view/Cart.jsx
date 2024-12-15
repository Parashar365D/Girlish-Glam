import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateInCart } from '../../store/cart-slice';
import { Link } from 'react-router-dom';
import { Toast } from '../../components/ui';
import emptyCart from "../../assets/emptyCart.png";

function Cart() {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.shoppingCart);
    const { user } = useSelector(state => state.auth);

    const handleUpdate = async (productId, quantity, type) => {
        try {
            const newQuantity = type === "increase" ? quantity + 1 : quantity - 1;
            if (newQuantity < 1) {
                Toast({ type: 'warn', message: 'Quantity cannot be less than 1.' });
                return;
            }
            const response = await dispatch(updateInCart({ userId: user?.id, productId, quantity: newQuantity })).unwrap();
            if (response?.success) {
                Toast({ type: 'success', message: 'Cart updated successfully!' });
            } else {
                Toast({ type: 'warn', message: 'Failed to update cart. Please try again.' });
            }
        } catch (error) {
            console.error('Update error:', error);
            Toast({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            await dispatch(fetchCart(user?.id)).unwrap();
        }
    };



    const handelRemoveItem = async (productId) => {
        try {
            const response = await dispatch(removeFromCart({ userId: user?.id, productId })).unwrap();

            if (response?.success) {
                Toast({ type: 'success', message: 'Item removed from cart' });
            } else {
                Toast({ type: 'warn', message: 'Failed to remove item from cart' });
            }
        } catch (error) {
            Toast({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            await dispatch(fetchCart(user?.id)).unwrap();
        }
    };


    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user?.id]);


    return (
        <Fragment>
            <section className="bg-gray-50 antialiased py-2">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl mb-6">
                            <div className="space-y-6">

                                {cartItems?.items?.length > 0 ? (cartItems.items.map((item) => (<div key={item.productId} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <Link to={`/product-view/${item.productId}`} className="shrink-0 md:order-1">
                                            <img className="h-28 w-28 mx-auto" src={item.image} alt={item.title} />
                                        </Link>

                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2" onClick={() => handleUpdate(item.productId, item.quantity, 'decrease')}>
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>

                                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" value={item.quantity} readOnly disabled />

                                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2" onClick={() => handleUpdate(item.productId, item.quantity, 'increase')}>
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900">₹{((item.salePrice) * (item.quantity)).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <Link to={`/product-view/${item.productId}`} className="text-base font-medium text-gray-900 hover:underline">{item.title}</Link>

                                            <div className="flex items-center gap-4">
                                                <button type="button" className="inline-flex mx-auto sm:mx-0 items-center text-sm font-medium bg-red-600 text-white py-2 px-2 rounded-md hover:underline" onClick={() => handelRemoveItem(item.productId)}>
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))) : (
                                    <div className="p-5 font-inter flex items-center justify-center">
                                        <div className="p-6 bg-white flex flex-col items-center w-full max-w-xl rounded-3xl shadow-lg overflow-hidden md:p-10">
                                            <div className="w-32 md:w-40">
                                                <img className="w-full" src={emptyCart} alt="Empty Cart" />
                                            </div>
                                            <div className="text-center space-y-4 mt-4">
                                                <div className="font-medium text-lg md:text-2xl">Your cart is empty</div>
                                                <p className="text-sm md:text-base text-gray-400 px-4 md:px-0">
                                                    Looks like you have not added anything to your cart. Go ahead and explore our top products.
                                                </p>
                                                <div className="text-center mt-4">
                                                    <button type="button" className="text-sm md:text-base rounded-lg text-white font-light px-2 py-3 md:px-5 md:py-3 bg-orange-400 hover:bg-orange-500" onClick={() => { window.location.replace('/'); }}>Continue Shopping</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                            </div>
                        </div>

                        <div className={`${cartItems?.items?.length > 0 ? "block" : "hidden"} mx-auto my-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full`}>
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <p className="text-xl font-semibold text-gray-900">Order summary</p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500">Original Price</dt>
                                            <dd className="text-base font-medium text-gray-900">₹{cartItems?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}</dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500">Savings</dt>
                                            <dd className="text-base font-medium text-green-600">-₹{cartItems?.items?.reduce((acc, item) => acc + (item.price - item.salePrice) * item.quantity, 0).toLocaleString()}</dd>
                                        </dl>
                                    </div>
                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                        <dt className="text-base font-bold text-gray-900">Total</dt>
                                        <dd className="text-base font-bold text-gray-900">₹{cartItems?.items?.reduce((sum, item) => sum + item.salePrice * item.quantity, 0).toLocaleString()}</dd>
                                    </dl>
                                </div>

                                <Link to={`/checkout/${user?.id}`} className="flex w-full items-center justify-center rounded-lg bg-orange-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-blue-300">Proceed to Checkout</Link>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500"> or </span>
                                    <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 underline hover:no-underline">
                                        Continue Shopping
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Cart;
