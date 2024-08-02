import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/shopContext';

function Card({ id, image, title, category, oldprice, newprice, description }) {
    
    const { addToCart } = useContext(ShopContext);

    const truncateText = (text, maxLength) => {
        if (!text) {
            return '';
        }
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      var randomNumber = getRandomNumber(3, 5);

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
        <div className="border rounded-lg shadow-lg px-3 py-4 w-72">
            <Link to={`/product/${id}`}><img src={image} alt={title} className="rounded-lg" /></Link>
            <div className="mt-2">
                <h3 className="py-1 text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{truncateText(title, 50)}</h3>
                <p className="py-1 text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">{truncateText(description, 100)}</p>
                <p className="py-1 text-gray-600"><i className="fa-solid fa-layer-group mx-1 text-pink-400"></i>{category}</p>
                {renderStars(randomNumber)}
                <div className="flex justify-start gap-2 items-center py-1">
                    <span className="text-lg font-bold text-green-600">₹{newprice}</span>
                    <span className="line-through text-gray-500">₹{oldprice}</span>
                </div>
                <div className="flex justify-between my-1">
                    <Link className='text-white text-xl font-serif w-auto px-3 py-2 rounded-lg bg-orange-400 hover:bg-orange-500' to={`/product/${id}`}>View Now</Link>
                    <button className='text-white text-xl font-serif w-auto px-3 py-2 rounded-lg bg-orange-400 hover:bg-orange-500' onClick={() => addToCart(id)}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
