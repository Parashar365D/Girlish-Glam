import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductsList() {
    const [allProduct, setAllProduct] = useState([]);

    const API = import.meta.env.VITE_URI;

    const truncateText = (text, maxLength) => {
        if (!text) {
            return '';
        }
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    // Fetch Product
    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API}/product/fetchproduct`);
            const result = await response.json();
            if (result.success) {
                setAllProduct(result.data);
            } else {
                console.error('Error fetching products:', result.error);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    // Remove Product
    const removeProduct = async (id) => {
        try {
            const removeResponse = await fetch(`${API}/product/removeproduct/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            if (removeResponse.ok) {
                alert(`Product ${id} remove successfully`)
                await fetchProduct();
            } else {
                console.error('Failed to delete the product');
            }
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };
      
    

    return (
        <div className="bg-white overflow-auto h-[32rem] flex flex-wrap items-center gap-3 md:gap-7 p-3 rounded-lg shadow-md">
    {allProduct.length === 0 ? (
        <p>No products available.</p>
    ) : (
        allProduct.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg px-3 py-4 w-72">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} className="rounded-lg object-cover" />
                </Link>
                <div className="mt-2">
                    <h3 className="py-1 text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{truncateText(product.title, 50)}</h3>
                    <p className="py-1 text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">{truncateText(product.description, 100)}</p>
                    <p className="py-1 text-gray-600"><i className="fa-solid fa-layer-group mx-1 text-pink-400"></i>{product.category}</p>
                    <div className="flex justify-start gap-2 items-center py-1">
                        <span className="text-lg font-bold text-green-600">₹{product.newprice}</span>
                        <span className="line-through text-gray-500">₹{product.oldprice}</span>
                    </div>
                    <div className="flex justify-between my-1">
                        <button onClick={() => {removeProduct(product.id)}} className='text-white text-xl font-serif w-full px-3 py-2 rounded-lg bg-orange-400 hover:bg-orange-500'>Delete</button>
                    </div>
                </div>
            </div>
        ))
    )}
</div>

    );
}

export default ProductsList;
