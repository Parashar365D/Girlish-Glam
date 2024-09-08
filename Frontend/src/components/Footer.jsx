import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
    return (
        <footer>
            <div className="flex flex-col  md:flex-row justify-between items-center px-5 py-3 border-y">
                <div className="hidden md:block">
                    <div className="w-28">
                        <Link to='/'><img src={logo} alt="logo" /></Link>
                    </div>
                </div>
                <div className="text-md my-3 md:my-0">
                    <ul className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2'>
                        <li>
                            <Link className='px-4 py-2 hover:text-gray-400 hover:underline' to=''>Private Policy</Link>
                        </li>
                        <li>
                            <Link className='px-4 py-2 hover:text-gray-400 hover:underline' to=''>Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link className='px-4 py-2 hover:text-gray-400 hover:underline' to=''>Shipping Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className="my-3 md:my-0">
                    <ul className='flex md:items-center gap-2'>
                        <li>
                            <Link className='text-gray-500 px-3 py-2 rounded-full border-4 hover:text-gray-700 hover:border-gray-700' to='https://github.com/Parashar365D/Girlish-Glam' target='blank'><i className="fa-brands fa-github"></i></Link>
                        </li>
                        <li>
                            <Link className='text-gray-500 px-3 py-2 rounded-full border-4 hover:text-gray-700 hover:border-gray-700' to='https://www.linkedin.com/in/chetan-parashar-374a64243' target='blank'><i className="fa-brands fa-linkedin-in"></i></Link>
                        </li>
                        <li>
                            <Link className='text-gray-500 px-3 py-2 rounded-full border-4 hover:text-gray-700 hover:border-gray-700' to='https://www.instagram.com/ichetan_365d/' target='blank'><i className="fa-brands fa-instagram"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-100 flex items-end justify-center">
                <div className='p-2'>Copyright &copy; 2024 GirLish Store</div>
            </div>
        </footer>
    );
}

export default Footer;
