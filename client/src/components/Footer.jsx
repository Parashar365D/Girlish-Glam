import React from 'react'
import  Logo  from "../assets/Logo.png";
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer>
            <div className="flex flex-col  md:flex-row justify-between items-center px-3 py-3 border-y">
                <div className="hidden md:block w-1/5">
                    <div className="w-52">
                        <NavLink to='/'><img src={Logo} alt="logo"/></NavLink>
                    </div>
                </div>
                <div className="text-md my-3 md:my-0">
                    <ul className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2'>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} px-4 py-2 hover:text-gray-400 hover:underline`}  to='/private_policy'>Private Policy</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} px-4 py-2 hover:text-gray-400 hover:underline`} to='/term_&_conditions'>Terms & Conditions</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-orange-500' : 'text-black'} px-4 py-2 hover:text-gray-400 hover:underline`} to='/shipping_policy'>Shipping Policy</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="my-3 md:my-0 md:w-1/5">
                    <ul className='flex md:items-center md:justify-end gap-2'>
                        <li>
                            <NavLink className='text-gray-500 hover:text-gray-700 hover:border-gray-700' to='https://www.linkedin.com/in/chetan-parashar-374a64243' target='blank'><lord-icon src="https://cdn.lordicon.com/qgebwute.json" trigger="hover" colors="primary:#000000,secondary:#000000"></lord-icon></NavLink>
                        </li>
                        <li>
                            <NavLink className='text-gray-500 hover:text-gray-700 hover:border-gray-700' to='https://www.instagram.com/ichetan_365d/' target='blank'><lord-icon src="https://cdn.lordicon.com/ewswvzmw.json" trigger="hover" colors="primary:#000000,secondary:#000000"></lord-icon></NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-100 flex items-end justify-center">
                <div className='p-2'>Copyright &copy; 2024 Girlish Glam</div>
            </div>
        </footer>
  )
}

export default Footer
