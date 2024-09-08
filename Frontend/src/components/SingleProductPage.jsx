import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/shopContext';

function SingleProductPage() {

    let navigate = useNavigate();
    const { id } = useParams();
    const { addToCart, allProducts } = useContext(ShopContext);
    const product = allProducts.find((product) => product.id === parseInt(id, 10));
    const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id);

    if (!product) {
        return <div className="p-4 text-center text-red-600">Product not found</div>;
    }

    const random = () => {
        let ran = Math.floor(Math.random() * (999 - 100 + 1) + 100);
        return ran;
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      let randomNumber = getRandomNumber(3, 5);

    const customerStars = (rating) => {
        const totalStars = 5;
        return (
            <div className="flex gap-0.5 items-center">
                {[...Array(totalStars)].map((_, index) => (
                    <i key={index} className={`fa${index < rating ? " fa-solid" : " fa-regular"} fa-star text-yellow-500`}></i>
                ))}
            </div>
        );
    };

    return (
        <section className="p-8 md:p-12 mx-auto max-w-screen-xl border-x">
            <div className="flex w-fit flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 border rounded-lg">
                    <img className="w-auto h-full max-h-full object-cover" src={product.image} alt={product.title} />
                </div>
                <div className="flex-1 p-4">
                    <h1 className="text-gray-800 text-3xl font-bold mb-3">{product.title}</h1>
                    <div className="flex items-center gap-2 text-base mb-3">
                        {customerStars(randomNumber)}
                        <span className="text-gray-600">{`${random()}K Review`}</span>
                    </div>
                    <div className="flex gap-4 text-2xl font-bold mb-3">
                        <span className="text-green-600">₹{product.newprice}</span>
                        <span className="text-gray-600 line-through">₹{product.oldprice}</span>
                    </div>
                    <div className='text-lg font-serif mb-3'>
                        <span className="text-gray-600 font-medium"><i className="fa-solid fa-layer-group mx-1 text-pink-400"></i>Category: {product.category}</span>
                    </div>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <div className="flex flex-col gap-4 mb-6">
                        <button className="px-6 py-3 w-fit bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-500" onClick={() => addToCart(id)}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <div className="p-4 mt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Customer Comments</h2>
                <form className="flex flex-col gap-4">
                    <textarea className="w-full p-3 border rounded-md resize-none" rows="4" placeholder="Leave a comment"></textarea>
                    <button type="submit" className="px-6 py-3 bg-orange-400 w-fit text-white font-semibold rounded-md hover:bg-orange-500">Submit</button>
                </form>
            </div>
            <div className="p-4 mt-6">
                <h2 className="text-xl font-semibold mb-4">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="border rounded-lg p-4">
                            <Link to={`/product/${relatedProduct.id}`}>
                                <img className="w-full h-48 object-cover mb-2" src={relatedProduct.image} alt={relatedProduct.title} />
                                <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.title}</h3>
                                <div className="flex items-center gap-2 text-base mb-2">
                                    {customerStars(randomNumber)}
                                </div>
                                <div className="flex gap-4 text-lg font-bold">
                                    <span className="text-green-600">₹{relatedProduct.newprice}</span>
                                    <span className="text-gray-600 line-through">₹{relatedProduct.oldprice}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SingleProductPage;
