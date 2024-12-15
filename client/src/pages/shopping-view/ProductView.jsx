import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct } from '../../store/admin/product-slice';
import { addToCart } from '../../store/cart-slice';
import { Toast } from '../../components/ui';
import { addProductReview, getProductReview } from '../../store/review-slice';
import { Fragment } from 'react';

function ProductView() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { reviewList } = useSelector((state) => state.review);
    const { productList } = useSelector((state) => state.adminProduct);
    const product = productList?.find((product) => product._id === id);
    const initialState = { userId: '', productId: '', name: '', rating: '', message: '' };
    const [formData, setFormData] = useState(initialState);

    const reviewLength = reviewList.length;
    const averageReview = reviewLength > 0 ?  reviewList.reduce((sum, review) => sum + review.rating, 0) / reviewLength : 4


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

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!user?.id) {
                Toast({ type: "error", message: "User is not authenticated." });
                setLoading(false);
                navigate('/auth/login');
                return;
            }

            if (!formData.rating) {
                Toast({ type: "error", message: "Please fill out all fields before submitting." });
                setLoading(false);
                return;
            }
            const response = await dispatch(addProductReview({ ...formData, userId: user?.id, productId: id })).unwrap();
            if (response?.success) {
                Toast({ type: "success", message: "Review added successfully." });
                setFormData(initialState);
                setOpenModal(false);
            } else {
                Toast({ type: "error", message: "You have to purchase this order." });
            }
        } catch (error) {
            Toast({ type: "error", message: error?.message || "An error occurred while adding review." });
        } finally {
            setLoading(false);
            await dispatch(getProductReview(id)).unwrap();
        }
    };

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(getProductReview(id));
    }, [dispatch, user?.id]);

    return (
        <Fragment>
            <section className="py-8 bg-white md:py-16 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 border-b">
                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                            <img className="w-full rounded-md" src={product?.image} alt={product?.title} />
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1 className="text-xl font-semibold text-black sm:text-2xl">{product?.title}</h1>
                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                                <div className='inline-flex items-center gap-3'>
                                    <p className="text-xl text-gray-500 sm:text-2xl line-through">₹{product?.price.toLocaleString()}</p>
                                    <p className="text-2xl font-bold text-green-600 sm:text-3xl">₹{product?.salePrice.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1">
                                        {Array(5).fill(0).map((_, i) => (<svg key={i} className={`w-4 h-4 ${i < averageReview.toFixed(1) ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={i < 5 ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                                            <path d={i < averageReview.toFixed(1) ? 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' : 'M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z'} />
                                        </svg>))}
                                    </div>
                                    <p className="text-sm font-medium leading-none text-gray-500">({averageReview.toFixed(1)})</p>
                                    <span className="text-sm font-medium leading-none text-black">{reviewLength} Reviews</span>
                                </div>
                            </div>
                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <button type='button' disabled={product?.totalStock === 0} className={`text-white mt-4 sm:mt-0 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center ${product?.totalStock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500 focus:ring-orange-300'}`} onClick={() => handleAddToCart(product?._id)}>{product?.totalStock === 0 ? "Out of stock" : "Add to cart"}</button>
                            </div>
                            <hr className="my-6 md:my-8 border-gray-200" />
                            <p className="mb-6 text-gray-500">{product?.description}</p>
                        </div>
                    </div>
                    <div className='py-3 '>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
                        </div>

                        <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
                            <div className="shrink-0 space-y-4">
                                <button type="button" className="mb-2 me-2 rounded-lg bg-orange-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300" onClick={() => setOpenModal(!openModal)}>Write a review</button>
                            </div>
                        </div>

                        <div className="mt-6 divide-y divide-gray-200">
                            {reviewList.length > 0 ? (reviewList.map((review) => (<div key={review.userId} className=" gap-4 py-4">
                                <dl className="md:col-span-3 order-3 md:order-1">
                                    <dt className="sr-only">Name:</dt>
                                    <dd className="text-base font-semibold text-gray-900">
                                        <div className='flex items-center gap-1'>
                                            <svg className="h-6 w-6 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clipRule="evenodd" />
                                            </svg>
                                            <p>{review.name}</p>
                                        </div>
                                        <p className="text-sm font-normal text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </dd>
                                </dl>

                                <div className="md:col-span-3 content-center order-1 md:order-3 flex items-center justify-between">
                                    <dl>
                                        <dt className="sr-only">Stars:</dt>
                                        <dd className="flex items-center space-x-1">
                                            {Array(5).fill(0).map((_, i) => (<svg key={i} className={`w-4 h-4  ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={i < review.rating ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                                                <path d={i < review.rating ? 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' : 'M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z'} />
                                            </svg>))}
                                        </dd>
                                    </dl>
                                </div>

                                <dl className="md:col-span-6 order-4 md:order-2">
                                    <dt className="sr-only">Message:</dt>
                                    <dd className=" text-gray-500">{review.message}</dd>
                                </dl>

                            </div>))) : (<span>Their is no review right now</span>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* add Review Modal */}
            {openModal && <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-black bg-opacity-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                            <h3 className="text-lg font-semibold text-gray-900">Add Product</h3>
                            <button type="button" onClick={() => setOpenModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddReview}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input type="text" name="name" id="name" value={formData.name} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Type product name" required />
                                </div>
                                <div>
                                    <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900">Rating</label>
                                    <select id="rating" name='rating' value={formData.rating} onChange={changeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                                        <option value="" disabled>Select rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Message</label>
                                    <textarea id="message" name='message' value={formData.massage} onChange={changeHandler} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write product description here" required></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            </div>}
        </Fragment>
    );
}

export default ProductView;
