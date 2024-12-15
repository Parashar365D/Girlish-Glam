import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import store_img_1 from "../../assets/store-img.jpg";
import store_img_2 from "../../assets/store-img2.jpg";
import review_1 from "../../assets/review1.jpg";
import review_2 from "../../assets/review2.jpg";
import review_3 from "../../assets/review3.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/admin/product-slice';
import ProductsCard from '../../components/ui/ProductsCard';

function Store() {

  const { productList, isLoading: productLoading } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  // Fetch All Product
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <section className="bg-gray-50 px-3">
        <div className="max-w-screen-xl mx-auto border-b py-10">
          <div className="flex items-center gap-10 justify-around">
            <div className='absolute px-2.5 text-center '>
              <h1 className="inline-flex md:block items-center justify-center mb-5 max-w-2xl text-4xl md:font-extralight font-light bg-black bg-opacity-20 rounded-md tracking-tight leading-snug md:text-5xl xl:text-6xl">Fresh and Natural Skincare For Best Result</h1>
              <Link to="/shop" className="inline-flex items-center justify-center w-32 h-12 text-base font-medium text-white rounded-lg bg-orange-400 focus:ring-4 focus:ring-orange-300">Shop Now</Link>
            </div>
            <div className="lg:mt-0">
              <img className='rounded-lg md:w-72 w-64 md:h-72 h-full' src={store_img_2} alt="mockup" />
            </div>
            <div className="lg:mt-0">
              <img className='rounded-lg w-96 md:h-96 h-auto' src={store_img_1} alt="mockup" />
            </div>
          </div>
        </div>

        <div className="py-2">
          <h1 className="py-10 mx-auto text-center font-extralight tracking-tight leading-none text-4xl xl:text-6xl">POPULAR PRODUCTS</h1>
          <div className="mt-6 md:px-10 px-0 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-2 md:mt-8">
            {productLoading ? Array.from({ length: 4 }).map((_, i) => (<div key={i} className="w-30 sm:w-64 relative flex flex-col items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-pulse">
              <div className="w-full rounded-t-lg p-2 bg-gray-300 h-40"></div>
              <div className="p-2 sm:p-5 w-full">
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="mt-3 mb-4 space-y-2">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3 mt-1"></div>
                  </div>
                </div>
                <div className="sm:mt-6 mt-3">
                  <div className="w-full bg-gray-300 rounded h-8"></div>
                </div>
              </div>
            </div>)) : productList.slice(0, 8).map((product) => (<div key={product.id}>
              <ProductsCard _id={product._id} totalStock={product.totalStock} image={product.image} title={product.title} description={product.description} price={product.price} salePrice={product.salePrice} category={product.category} />
            </div>))}
        
          </div>
        </div>


        <div className="py-2 px-4">
          <h1 className="py-10 mx-auto text-center font-extralight tracking-tight leading-none text-4xl xl:text-6xl">What Our Clients Say</h1>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-evenly gap-6 px-4 md:px-0">
            <div className="border p-6 rounded-xl max-w-sm md:max-w-md bg-white shadow-md mx-auto">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="w-24 md:w-36"><img className="rounded-full object-cover" src={review_1} alt="review_1" /></div>
                <div className="text-center md:text-left">
                  <h1 className="text-gray-700 font-medium text-lg">Neha Sharma</h1>
                  <p className="text-gray-600 text-sm md:text-base mt-2">This product is amazing! It has transformed my skin, and I couldn't be happier with the results.</p>
                  <div className="flex justify-center md:justify-start mt-3">
                    {Array(5).fill(0).map((_, i) => (<svg key={i} className={`w-6 h-6 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={i < 5 ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                      <path d={i < 5 ? 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' : 'M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z'} />
                    </svg>))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-6 rounded-xl max-w-sm md:max-w-md bg-white shadow-md mx-auto">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="w-24 md:w-36"><img className="rounded-full object-cover" src={review_2} alt="review_1" /></div>
                <div className="text-center md:text-left">
                  <h1 className="text-gray-700 font-medium text-lg">Riya Kushwaha</h1>
                  <p className="text-gray-600 text-sm md:text-base mt-2">This product is amazing! It has transformed my skin, and I couldn't be happier with the results.</p>
                  <div className="flex justify-center md:justify-start mt-3">
                    {Array(5).fill(0).map((_, i) => (<svg key={i} className={`w-6 h-6 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={i < 5 ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                      <path d={i < 5 ? 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' : 'M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z'} />
                    </svg>))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-6 rounded-xl max-w-sm md:max-w-md bg-white shadow-md mx-auto">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="w-24 md:w-36"><img className="rounded-full object-cover" src={review_3} alt="review_1" /></div>
                <div className="text-center md:text-left">
                  <h1 className="text-gray-700 font-medium text-lg">Anjali Yadav</h1>
                  <p className="text-gray-600 text-sm md:text-base mt-2">Fantastic products with great quality. My skin has never felt better. I am a loyal customer now.</p>
                  <div className="flex justify-center md:justify-start mt-3">
                    {Array(5).fill(0).map((_, i) => (<svg key={i} className={`w-6 h-6 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={i < 5 ? 'currentColor' : 'none'} viewBox="0 0 24 24">
                      <path d={i < 5 ? 'M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' : 'M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z'} />
                    </svg>))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <h1 className="py-10 mx-auto text-center font-extralight tracking-tight leading-none text-4xl xl:text-6xl">About Us</h1>
          <div className="text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="p-6 rounded-xl max-w-lg bg-white shadow-md mx-auto">
              <h2 className="py-4 text-gray-700 text-center text-xl font-medium tracking-tight leading-tight sm:text-2xl md:text-3xl">Our Mission</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">At Girlish Glam, our mission is to provide fresh, natural skincare products that deliver the best results. We believe in using only the highest quality ingredients to create products that enhance your natural beauty and leave your skin feeling revitalized.</p>
            </div>

            <div className="p-6 rounded-xl max-w-lg bg-white shadow-md mx-auto">
              <h2 className="py-4 text-gray-700 text-center text-xl font-medium tracking-tight leading-tight sm:text-2xl md:text-3xl">Our Story</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Girlish Glam was founded with the vision of offering premium skincare solutions that are both effective and gentle on the skin. Our journey began with a passion for beauty and a desire to create products that cater to the diverse needs of our customers.</p>
            </div>

            <div className="p-6 rounded-xl max-w-lg bg-white shadow-md mx-auto">
              <h2 className="py-4 text-gray-700 text-center text-xl font-medium tracking-tight leading-tight sm:text-2xl md:text-3xl">Our Values</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">We are committed to sustainability, transparency, and excellence in everything we do. Our values guide us in our mission to provide products that not only make you look good but also feel good about using them.</p>
            </div>
          </div>
        </div>

      </section>
    </Fragment>
  );
}

export default Store;
