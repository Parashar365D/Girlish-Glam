import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
    return (
        <section className='bg-gray-50'>
                <Outlet />
        </section>
    );
}

export default AuthLayout;
