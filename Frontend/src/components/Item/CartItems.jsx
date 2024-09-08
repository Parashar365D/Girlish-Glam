import React, { useContext } from 'react';
import { ShopContext } from '../../Context/shopContext';
import { Link } from 'react-router-dom';

function CartItems() {
    const { allProducts, cartItem, addToCart, removeFromCart, clearCart, TotalCartAmount } = useContext(ShopContext);

    const cartIsEmpty = Object.values(cartItem).every(item => item === 0);

    return (
        <section className="p-8">
            {cartIsEmpty ? (
                <div className="flex flex-col items-center justify-center h-[264px]">
                    <div className='text-lg font-semibold text-gray-600 mb-5'>
                        There are no items in the cart
                    </div>
                    <Link className='px-4 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-md' to='/shop'>Go and shop Now</Link>
                </div>
            ) : (
                <>
                    <div className="hidden md:flex bg-gray-300 font-semibold py-2 mb-4 rounded-md">
                        <div className="flex-1 text-center">Product</div>
                        <div className="flex-1 text-center">Title</div>
                        <div className="flex-1 text-center">Price</div>
                        <div className="flex-1 text-center">Quantity</div>
                        <div className="flex-1 text-center">Total</div>
                        <div className="flex-1 text-center">Remove</div>
                    </div>
                    <div className="mb-4 border-b"></div>
                    {allProducts.map((product) => {
                        if (cartItem[product.id] > 0) {
                            return (
                                <div key={product.id} className="flex flex-col md:flex-row items-center mb-4 border-b p-3 bg-white rounded-md shadow-md">
                                    <div className="flex-1 flex items-center justify-center">
                                        <img className="w-full md:w-20 md:h-20 object-cover rounded-md" src={product.image} alt={product.title} />
                                    </div>
                                    <div className='block md:hidden border-b  w-full mb-2'></div>
                                    <div className="flex-1 text-center mb-2">{product.title}</div>
                                    <div className='block md:hidden border-b  w-full mb-2'></div>
                                    <div className="flex-1 text-center mb-2">₹{product.newprice}</div>
                                    <div className='block md:hidden border-b  w-full mb-2'></div>
                                    <div className="flex-1 flex items-center justify-center mb-2">
                                        <button className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => removeFromCart(product.id)}>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <span className="border px-3 mx-2">{cartItem[product.id]}</span>
                                        <button className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => addToCart(product.id)}>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className='block md:hidden border-b  w-full mb-2'></div>
                                    <div className="flex-1 text-center mb-2">₹{product.newprice * cartItem[product.id]}</div>
                                    <div className='block md:hidden border-b  w-full mb-2'></div>
                                    <div className="flex-1 flex items-center justify-center">
                                        <button className="text-red-600 px-4 py-2 hover:text-red-800 hover:rounded-full hover:border hover:bg-gray-400" onClick={() => clearCart(product.id)}>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="mt-8 p-4 md:w-2/5 bg-gray-100 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
                        <div className="flex justify-between mb-2">
                            <div>Subtotal</div>
                            <div>₹{TotalCartAmount()}</div>
                        </div>
                        <hr />
                        <div className="flex justify-between mb-2">
                            <div>Shipping Fee</div>
                            <div>₹100</div>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold text-lg">
                            <div>Total</div>
                            <div>₹{TotalCartAmount() + 100}</div>
                        </div>
                        <div className='flex-1 mt-5 text-center'>
                            <button className='px-3 py-2 text-white bg-orange-400 hover:bg-orange-500 rounded-md' onClick={()=>{alert('checkout is not functonal'),window.location.replace('/')}}>Checkout</button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default CartItems;
