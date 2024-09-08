import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <section className="flex items-center justify-center md:h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Oops! The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 text-white bg-orange-400 rounded-md hover:bg-orange-500">Go to Home</Link>
      </div>
    </section>
  );
}

export default Page404;
