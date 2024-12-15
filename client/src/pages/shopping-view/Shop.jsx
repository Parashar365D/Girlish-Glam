import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/admin/product-slice';
import Carousel from '../../components/ui/Carousel';
import ProductsCard from '../../components/ui/ProductsCard';

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('');
  const { productList, isLoading: productLoading } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();

  const categories = ['all', ...new Set(productList.map(product => product.category))];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredProducts = productList.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.salePrice - b.salePrice;
    if (sortOption === 'price-desc') return b.salePrice - a.salePrice;
    if (sortOption === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <section className="bg-gray-50">
        <Carousel />
        <div className="py-4 px-3 max-w-screen lg:py-4 lg:px-6">
          <div className="mb-6 flex justify-between border-b py-4">
            <div className="my-2 text-base">
              <label className="cursor-pointer">Category : </label>
              <select className="w-20 md:w-auto border rounded-md py-2 px-2 md:px-3 cursor-pointer" value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => (<option className="cursor-pointer" key={category} value={category}>{category}</option>))}
              </select>
            </div>
            <div className="my-2 text-base">
              <label className="cursor-pointer">Sort by : </label>
              <select className="w-32 md:w-auto border rounded-md py-2 px-3 cursor-pointer" value={sortOption} onChange={handleSortChange}>
                <option value="">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
          <div className="grid gap-3 md:gap-8 mb-6 lg:mb-16 grid-cols-2 md:grid-cols-4">
            {productLoading ? Array.from({ length: 8 }).map((_, i) => (<div key={i} className="w-30 sm:w-64 relative flex flex-col items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-pulse">
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
            </div>)) : sortedProducts.map(product => (<div key={product.id}>
                <ProductsCard _id={product._id} totalStock={product.totalStock} image={product.image} title={product.title} description={product.description} price={product.price} salePrice={product.salePrice} category={product.category} />
              </div>))}
          </div>
        </div>

      </section>
    </Fragment>
  );
}

export default Shop;