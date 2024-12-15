import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


function AdminLayout() {

    const [sideBar, setSideBar] = useState(false);


    return (
        <section className="bg-gray-100  font-inter flex">
            <aside className={`w-1/2 sm:w-80 h-96 border-r transition-transform ${sideBar ? "translate-x-0" : "-translate-x-full hidden sm:block"} sm:translate-x-0`}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium"> 
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-black' : 'text-gray-700'} flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium`} to="/admin/orders" onClick={()=>setSideBar(!sideBar)}><lord-icon src='https://cdn.lordicon.com/fjvfsqea.json' trigger="hover" colors="primary:#000000,secondary:#00000"></lord-icon>Orders</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? 'text-black' : 'text-gray-700'} flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-200 font-medium`} to="/admin/products" onClick={()=>setSideBar(!sideBar)}><lord-icon src='https://cdn.lordicon.com/rezibkiy.json' trigger="hover" colors="primary:#000000,secondary:#00000"></lord-icon>Products</NavLink>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className={`fixed sm:hidden transition-transform ${sideBar ? "translate-x-full left-32" : "-translate-x-3"}`}>
                <button className='bg-white w-fit px-3 py-2 border-l rounded-r-full' onClick={()=>setSideBar(!sideBar)}>
                    {sideBar ? <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                        : <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                        </svg>}
                </button>
            </div>

            <div className={`bg-white text-center h-96 ${sideBar ? "w-1/2" : "w-full"} sm:w-full`}>
                <div className='h-full overflow-auto'>
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default AdminLayout;