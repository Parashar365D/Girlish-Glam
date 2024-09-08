import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/shopContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isopen, setIsopen] = useState(false);
    const { TotalItem } = useContext(ShopContext);
    let navigate = useNavigate()

    const togglebtn = () => {
        setIsopen(!isopen);
    };

    const logOut = () => {
        localStorage.removeItem('auth-token');
        navigate('/');
    }
    
    const renderLogin = () => {
      navigate('/login');
    }
    
    const handleNavLinkClick = () => {
        setIsopen(false);
    }

    return (
        <nav className="bg-white font-serif border-b">
            <div className="px-5 py-3 border-b">
                <div className="flex items-center md:justify-evenly justify-between">
                    <div className="hidden md:block">
                        <input type="search" className='border border-r-0 rounded-r-none focus:outline-none rounded-md px-4 py-2 m-0' placeholder='Search here' />
                        <button className='px-4 py-2 rounded-md border-l-0 border-[1px] rounded-l-none bg-orange-400 hover:bg-orange-500 text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div className="md:mr-44 mr-0">
                        <NavLink to='/admin'><img className='w-28' src={logo} alt="logo" /></NavLink>
                    </div>
                    <div className="flex md:flex-row gap-1">
                        <button className='px-4 md:px-4 py-2 md:text-xl border-[1px] rounded-md bg-orange-400 hover:bg-orange-500 text-white' onClick={localStorage.getItem('auth-token') ? logOut : renderLogin}>{localStorage.getItem('auth-token') ? <i className="fa-solid fa-user-gear"></i> : <i className="fa-regular fa-user"></i>}</button>
                        <NavLink className='flex items-center justify-center px-4 md:px-4 py-2 md:text-xl border-[1px] rounded-md hover:bg-orange-500 hover:text-white' to='/cart'><i className="fa-solid fa-cart-shopping"><span className='p-1 rounded-full text-sm'>{TotalItem()}</span></i></NavLink>
                    </div>
                </div>
            </div>
            <div className="px-5 py-2 ">
                <div className="flex items-center justify-center">
                    <button className='md:hidden block border-[1px] hover:bg-orange-500 hover:text-white rounded-md px-4 py-2' onClick={togglebtn}>
                        {isopen ? (<i className="fa-solid fa-x"></i>) : (<i className="fa-solid fa-bars"></i>)}
                    </button>
                </div>
                <div className="hidden md:block">
                    <ul className='flex items-center justify-center gap-2'>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-gray-400 rounded-md px-4 py-2`} to='/'>Store</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-gray-400 rounded-md px-4 py-2`} to='/shop'>Shop Now</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-gray-400 rounded-md px-4 py-2`} to='/contact'>Contact us</NavLink>
                        </li>
                    </ul>
                </div>
                {isopen && (
                    <div className='block md:hidden'>
                        <ul className='flex flex-col items-center justify-center py-2'>
                            <li className='my-1'>
                                <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-gray-400 rounded-md px-4 py-2`} to='/' onClick={handleNavLinkClick}>Store</NavLink>
                            </li>
                            <li className='my-1'>
                                <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-gray-400 rounded-md px-4 py-2`} to='/shop' onClick={handleNavLinkClick}>Shop Now</NavLink>
                            </li>
                            <li className='my-1'>
                                <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} hover:text-gray-400 rounded-md px-4 py-2`} to='/contact' onClick={handleNavLinkClick}>Contact us</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
