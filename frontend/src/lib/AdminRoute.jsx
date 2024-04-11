import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper';
import AdminLayout from '../components/AdminLayout';
const AdminRoute = ({ children, ...rest }) => {
    const location = useLocation();

    return auth.isAdmin() ? (
        <>
        <AdminLayout>
        {children}
        </AdminLayout>
        </>
    ) : (
        <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />
    );
};
export default AdminRoute;

