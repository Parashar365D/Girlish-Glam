import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/shopContext';
import Banner from '../assets/Banner.png'
import Card from './Item/Card';

function Shop() {
  const { allProducts } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!Array.isArray(allProducts)) {
    console.error('allProducts is not an array:', allProducts);
    return <div>Error loading products</div>;
  }

  const categories = ['all', ...new Set(allProducts.map(product => product.category))];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = allProducts.filter(product => {
    return selectedCategory === 'all' || product.category === selectedCategory;
  });

  return (
    <section>
      <div className="w-full mt-5"><img src={Banner} alt="banner" /></div>
      <div className='container md:mx-auto py-8 px-2'>
      <div className="mb-8 flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 my-2">
          <label className="mr-2 cursor-pointer">Category   :</label>
          <select className="border rounded-md py-2 px-3 cursor-pointer" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option className='cursor-pointer' key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-center md:justify-normal">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <Card 
                id={product.id} 
                image={product.image} 
                title={product.title} 
                category={product.category} 
                oldprice={product.oldprice} 
                newprice={product.newprice} 
                description={product.description}
              />
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
      </div>
    </section>
  );
}

export default Shop;
