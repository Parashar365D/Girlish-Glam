import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../store/order-slice';

function PaymentSuccess() {

    const { user } = useSelector((state) => state.auth);
    const { orderList } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.id) {
            dispatch(getAllOrders(user.id));
        }
    }, [dispatch, orderList]);

    const latestOrder = orderList?.filter(order => order.orderStatus === 'Confirmed')?.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))[0];

    return (
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                {latestOrder && (<div>
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-2">Thanks for your order!</h2>
                    <p className="text-gray-500 mb-6 md:mb-8">Your order <span className="font-medium text-blue-900 hover:underline cursor-pointer">#{latestOrder._id}</span> will be processed within 48 hours during working days. We will notify you by email once your order has been shipped.</p>
                    <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 mb-6 md:mb-8">
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500">Date</dt>
                            <dd className="font-medium text-gray-900 sm:text-end">{new Date(latestOrder.orderDate).toLocaleDateString()}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500">Payment Method</dt>
                            <dd className="font-medium text-gray-900 sm:text-end">{latestOrder.paymentMethod}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500">Name</dt>
                            <dd className="font-medium text-gray-900 sm:text-end">{latestOrder.addressInfo.name}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500">Address</dt>
                            <dd className="font-medium text-gray-900 sm:text-end">{`${latestOrder.addressInfo.address}, ${latestOrder.addressInfo.landmark}, ${latestOrder.addressInfo.city}, ${latestOrder.addressInfo.state} - ${latestOrder.addressInfo.pincode}`}</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500">Phone</dt>
                            <dd className="font-medium text-gray-900 sm:text-end">{latestOrder.addressInfo.phone}</dd>
                        </dl>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to={`/account/${user?.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">Track your order</Link>
                        <Link to="/" className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-orange-400 rounded-lg border hover:bg-orange-500 focus:z-10 focus:ring-4 focus:ring-gray-100">Return to shopping</Link>
                    </div>
                </div>)}
            </div>
        </section>
    );
}

export default PaymentSuccess;