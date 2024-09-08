import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Store from './components/Store';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Login from './components/Login';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Page404 from './components/Page404';
import SingleProductPage from './components/SingleProductPage';

// Lazy load the Admin component
const Admin = React.lazy(() => import('./components/AdminPanel/Admin'));

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
