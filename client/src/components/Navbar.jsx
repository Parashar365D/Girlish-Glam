import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, resetToken } from '../store/auth-slice';
import { Toast } from './ui';
import { searchProduct } from '../store/search-slice';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState(true);
    const dropdownRef = useRef(null);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { searchResult } = useSelector((state) => state.search);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleNavLinkClick = () => {
        setIsOpen(false);
    };

    const accountHandler = (e) => {
        e.preventDefault();
        if (user?.role === "admin") {
            setShowDropdown(false);
            navigate("/admin/products");
        } else {
            setShowDropdown(false);
            navigate(`/account/${user?.id}`);
        }
    };

    const logoutHandler = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            try {
                dispatch(resetToken());
                sessionStorage.clear();
                setShowDropdown(false);
                Toast({ type: 'success', message: 'Logout successful' });
                navigate('/');
            } catch (error) {
                setShowDropdown(false);
                Toast({ type: 'error', message: 'Failed to logout. Please try again.' });
            }
        } else {
            setShowDropdown(false);
            navigate('/auth/login');
        }
    };


    useEffect(() => {
        if (keyword && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(searchProduct(keyword));
            }, 1000);
        }
    }, [keyword]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <nav className="bg-white antialiased border-b font-inter">
            <div className='border-b'>
                <div className="w-full px-2 2xl:px-0 py-2 lg:py-0">
                    <div className="flex items-center justify-between">

                        <form className="hidden relative md:flex items-center">
                            <label htmlFor="keyword" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="keyword" name='keyword' value={keyword} onChange={(e) => { setKeyword(e.target.value); setIsVisible(true); }} className="block w-64 p-3 pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50" placeholder="Search" required="" />
                            </div>
                            <div className={`${searchResult.length === 0 || !isVisible || keyword === '' ? "hidden" : "block"} left-0 top-12 bg-white rounded-md absolute border w-64 h-72 z-10 overflow-auto p-3`}>
                                {searchResult.map((item) => (<div key={item._id} className='border-b pb-2' >
                                    <div className='w-full truncate text-sm p-2 hover:underline text-gray-700' onClick={() => {setIsVisible(false); setKeyword('')}}><Link to={`/product-view/${item._id}`}>{item.title}</Link></div>
                                    <span className='bg-blue-100 text-blue-800 p-1.5 text-sm rounded-lg'>{item.category}</span>
                                </div>))}
                            </div>
                        </form>

                        <div className="flex items-center space-x-8">
                            <div className="w-fit shrink-0 md:-ml-48 ml-0">
                                <NavLink to="/">
                                    <img className="block w-44 md:w-full h-16 lg:h-24" src={Logo} alt="Logo" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 lg:space-x-2">

                            <Link type="button" className="inline-flex items-center rounded-lg justify-center w-12 h-12 bg-orange-400 text-sm font-medium leading-none text-black" to="/cart">
                                <svg className="w-8 h-8 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
                                </svg>
                            </Link>

                            <button type="button" className="inline-flex items-center rounded-lg justify-center w-12 h-12 bg-orange-400 text-sm font-medium leading-none text-black" onClick={toggleDropdown} aria-expanded={showDropdown} aria-haspopup="true">
                                <svg className="w-8 h-8 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>

                            {showDropdown && (<div ref={dropdownRef} className={`absolute right-1 border ${isAuthenticated ? "mt-48" : "mt-32"} z-10 w-48 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow`}>
                                <ul className="p-2 text-start text-sm font-medium text-gray-900 space-y-1">
                                    <li className={`${isAuthenticated ? "block" : "hidden"} inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-base text-black`}>{user?.name}</li>
                                    <li><button className={`${isAuthenticated ? "block" : "hidden"} inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100`} onClick={accountHandler}> {user?.role === "admin" ? "Admin Dashboard" : "My Account"} </button></li>
                                    <li className={`${isAuthenticated ? "block" : "hidden"} border-b`}></li>
                                    <li><button className={`${isAuthenticated ? "text-red-700" : "text-gray-700"} inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100`} onClick={logoutHandler}>
                                        {isAuthenticated ? (<svg className="w-6 h-6 text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                                        </svg>) : (<svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                                        </svg>)}
                                        {isAuthenticated ? 'Sign Out' : 'Login'}
                                    </button></li>
                                </ul>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 py-2">
                <div className="flex items-center justify-center md:hidden">
                    <button className="inline-flex items-center justify-center border focus:bg-orange-400 text-black rounded-md w-14 h-12" onClick={toggleMobileMenu}>
                        {isOpen ? (
                            <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        ) : (
                            <svg className="w-10 h-10 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 7h14M5 12h14M5 17h14" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="hidden md:block">
                    <ul className="flex items-center justify-center gap-4">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-orange-500 rounded-md px-4 py-2`}>Store</NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop" className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-orange-500 rounded-md px-4 py-2`}>Shop Now</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact_us" className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-orange-500 rounded-md px-4 py-2`}>Contact Us</NavLink>
                        </li>
                    </ul>
                </div>

                {isOpen && (
                    <div className="block md:hidden">
                        <ul className="flex flex-col items-center gap-2 py-2 text-base">
                            <li>
                                <NavLink to="/" className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-orange-500 rounded-md px-4 py-2`} onClick={handleNavLinkClick}>Store</NavLink>
                            </li>
                            <li>
                                <NavLink to="/shop" className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-orange-500 rounded-md px-4 py-2`} onClick={handleNavLinkClick}>Shop Now</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact_us" className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-orange-500 rounded-md px-4 py-2`} onClick={handleNavLinkClick}>Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
