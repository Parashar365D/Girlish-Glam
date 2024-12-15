import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/cart-slice';
import { Toast } from '../../components/ui';

function ProductsCard({ _id, image, title, totalStock, price, salePrice, category }) {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saleCalculator = (price, salePrice) => {
        const calculate = ((price - salePrice) / price) * 100;
        return Math.round(calculate);
    };

    const handleAddToCart = async (_id) => {
        setLoading(true);
        try {
            if (!user?.id) {
                Toast({ type: "error", message: "User is not authenticated." });
                navigate('/auth/login');
                return;
            }
            const response = await dispatch(addToCart({ userId: user?.id, productId: _id, quantity: 1 })).unwrap();
            if (response?.success) {
                Toast({ type: "success", message: "Item added to cart successfully." });
                setLoading(false);
            } else {
                Toast({ type: "error", message: "Failed to add item to cart." });
            }
        } catch (error) {
            Toast({ type: "error", message: "An error occurred while adding to cart." });
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            <div className="h-fit w-full">
                <Link to={`/product-view/${_id}`}>
                    <img className="mx-auto h-fit" src={image} alt={title} />
                </Link>
            </div>
            <div className="pt-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"> Up to {saleCalculator(price, salePrice)}% off </span>
                </div>

                <Link to={`/product-view/${_id}`} className="block text-lg font-semibold leading-tight text-gray-900 hover:underline truncate">{title}</Link>
                <div className="mt-2 flex items-center  gap-2">
                    <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (<svg key={i} className={`w-5 h-5 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={i < 5 ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                            <path d={i < 5 ? 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' : 'M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z'} />
                        </svg>))}
                    </div>
                    <p className="text-base font-medium text-gray-900">5.0</p>
                </div>

                <ul className="mt-2 md:flex items-center gap-4">
                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500">{category}</p>
                    </li>
                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500">Fast Delivery</p>
                    </li>
                </ul>

                <div className="mt-2 flex items-center gap-2">
                    <p className="text-lg md:text-2xl font-bold leading-tight text-gray-500 line-through">₹{price.toLocaleString()}</p>
                    <p className="text-lg md:text-2xl font-bold leading-tight text-green-600">₹{salePrice.toLocaleString()}</p>
                </div>
            </div>
            <div className='pt-4'>
                <button type="button" disabled={totalStock === 0} className={`w-full inline-flex items-center justify-center rounded-lg px-3 md:px-5 md:py-2.5 py-2 text-base font-medium text-white focus:outline-none focus:ring-4 ${totalStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500 focus:ring-orange-300'}`} onClick={() => handleAddToCart(_id)}>
                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                    </svg>
                    {totalStock === 0 ? "Out of stock" : "Add to cart"}
                </button>
            </div>
        </section>
    );
}

export default ProductsCard;
