import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductsList';

function Admin() {
  const [view, setView] = useState('addProduct');

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-white shadow-md">
          <div className="flex flex-col p-4">
            <button className={`mb-2 p-2 text-left ${view === 'addProduct' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`} onClick={() => setView('addProduct')}><i className="fa-solid fa-upload mr-2"></i>Add Product</button>
            <button className={`p-2 text-left ${view === 'productList' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`} onClick={() => setView('productList')}><i className="fa-regular fa-folder-open mr-2"></i>Product List</button>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-4">
          {view === 'addProduct' ? <AddProduct /> : <ProductList />}
        </div>
      </div>
    </section>

  );
}

export default Admin;
