import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Page404 from './pages/page404/Page404';
import Footer from './components/Footer';
import ShippingPolicy from './pages/policys/ShippingPolicy';
import PrivacyPolicy from './pages/policys/PrivacyPolicy';
import TermsConditions from './pages/policys/TermsConditions';
import AuthLayout from "./components/auth-layout/AuthLayout";
import AdminLayout from "./components/admin-layout/AdminLayout";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AuthCheck from "./components/common/AuthCheck";
import ShoppingLayout from './components/shopping-layout/ShoppingLayout';
import Shop from "./pages/shopping-view/Shop";
import Store from "./pages/shopping-view/Store";
import Account from "./pages/shopping-view/Account";
import Checkout from "./pages/shopping-view/Checkout";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import ContactUs from './pages/shopping-view/ContactUs';
import Cart from './pages/shopping-view/Cart';
import ProductView from './pages/shopping-view/ProductView';
import PaymentSuccess from './pages/shopping-view/PaymentSuccess';
function App() {

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/auth' element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </AuthCheck>}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path='/admin' element={
          <AuthCheck isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </AuthCheck>}>
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
        
        <Route path='/' element={<ShoppingLayout />}>
          <Route path='/' element={<Store />} />
          <Route path='account/:userId' element={<Account />} />
          <Route path='product-view/:id' element={<ProductView />} />
          <Route path='shop' element={<Shop />} />
          <Route path='cart' element={<Cart />} />
          <Route path='contact_us' element={<ContactUs />} />
          <Route path='checkout/:userId' element={<Checkout />} />
          <Route path='success/:userId' element={<PaymentSuccess />} />
        </Route>
        <Route path="/shipping_policy" element={<ShippingPolicy />} />
        <Route path="/private_policy" element={<PrivacyPolicy />} />
        <Route path="/term_&_conditions" element={<TermsConditions />} />
        <Route path="*" element={<Page404 />} />
      </Routes >
      <Footer />
    </>
  );
}

export default App;