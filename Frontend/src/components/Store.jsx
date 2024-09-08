import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import Card from './Item/Card';
import Reviews from '../assets/Reviews';
import { ShopContext } from '../Context/shopContext';

function Store() {

    const { allProducts } = useContext(ShopContext);

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      let randomNumber = getRandomNumber(3, 5);

    const renderStars = (randomNumber) => {
        const totalStars = 5;
        return (
            <div className="flex gap-0.5 items-center my-1">
                {[...Array(totalStars)].map((_, index) => (
                    <i key={index} className={`fa${index < randomNumber ? " fa-solid" : " fa-regular"} fa-star text-yellow-500`}></i>
                ))}
            </div>
        );
    };

    return (
        <main>
            <section className="relative h-auto my-2 border-b pb-5">
                <div className="relative p-5 z-10">
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center md:text-left z-20">
                        <div className="text-2xl md:text-7xl mb-2 px-1 py-3 md:w-4/6 md:px-9 md:py-5 md:leading-[84px]">
                            <h1 className='text-gray-900 md:font-extralight font-sans'>Fresh and Natural Skincare For Best Result</h1>
                        </div>
                        <div className="md:mt-10 text-2xl flex justify-center">
                            <Link className='bg-orange-400 text-white px-3 py-1.5 md:py-2 md:px-5 rounded-md hover:bg-orange-500' to='/shop'>Shop Now</Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-around z-10">
                        <div className="md:w-[25%] w-2/5 mx-2 md:mx-0 animate-slideInFromBottom">
                            <img className="rounded-xl" src={img1} alt="Home-Img-1" />
                        </div>
                        <div className="md:w-[36%] w-3/5 animate-slideInFromBottomDelayed">
                            <img className="rounded-xl" src={img2} alt="Home-Img-2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Product show here */}
            <section className="container md:mx-auto py-10">
                <div className="flex justify-center items-center mb-8">
                    <div className="text-3xl md:text-6xl font-extralight">POPULAR PRODUCTS</div>
                </div>
                <div className="flex flex-wrap gap-6 items-center justify-center px-8">
                    {allProducts.slice(0, 6).map(product => (
                        <div key={product.id}>
                            <Card id={product.id} image={product.image} title={product.title} category={product.category} oldprice={product.oldprice} newprice={product.newprice} description={product.description}/>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials section */}
            <section className="container md:mx-auto py-5">
                <div className="flex justify-center items-center mb-8">
                    <div className='text-3xl md:text-5xl font-extralight'>What Our Clients Say</div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around">
                    {Reviews.map(review => (
                        <div key={review.id} className="border w-auto px-3 py-3 rounded-md m-2">
                            <div className="flex items-center">
                                <img className='rounded-full w-16' src={review.image} alt={`${review.name}'s Image`} />
                                <div className="ml-4">
                                    <p className='text-gray-600'>{review.name}</p>
                                    <p className='flex flex-wrap text-gray-900'>{review.review}</p>
                                    <div>
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About us section */}
            <section className="container md:mx-auto py-5">
                <div className="flex justify-center items-center mb-5">
                    <div className='text-3xl md:text-5xl'>About Us</div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-evenly text-center md:text-left">
                    <div className="md:w-1/3 p-5">
                        <h2 className="text-xl md:text-3xl mb-4">Our Mission</h2>
                        <p className="text-gray-700">At Girlish Glam, our mission is to provide fresh, natural skincare products that deliver the best results. We believe in using only the highest quality ingredients to create products that enhance your natural beauty and leave your skin feeling revitalized.</p>
                    </div>
                    <div className="md:w-1/3 p-5">
                        <h2 className="text-xl md:text-3xl mb-4">Our Story</h2>
                        <p className="text-gray-700">Girlish Glam was founded with the vision of offering premium skincare solutions that are both effective and gentle on the skin. Our journey began with a passion for beauty and a desire to create products that cater to the diverse needs of our customers.</p>
                    </div>
                    <div className="md:w-1/3 p-5">
                        <h2 className="text-xl md:text-3xl mb-4">Our Values</h2>
                        <p className="text-gray-700">We are committed to sustainability, transparency, and excellence in everything we do. Our values guide us in our mission to provide products that not only make you look good but also feel good about using them.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Store;
