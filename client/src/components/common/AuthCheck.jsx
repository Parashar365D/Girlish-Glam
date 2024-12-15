import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function AuthCheck({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/signup'))) {
        return <Navigate to='/auth/login' />;
    }

    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/signup'))) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/products' />;
        } else {
            return <Navigate to='/shop' />;
        }
    }

    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')) {
        return <Navigate to='*' />;
    }

    return <>{children}</>;
}

export default AuthCheck;