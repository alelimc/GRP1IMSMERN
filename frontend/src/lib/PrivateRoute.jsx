import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper';
import PrivateLayout from '../components/PrivateLayout';
const PrivateRoute = ({ children, ...rest }) => {
    const location = useLocation();

    return auth.isAuthenticated() ? (
        <>
        <PrivateLayout>

        {children}
        </PrivateLayout>
        </>
    ) : (
        <Navigate
            to="/login"
            state={{ from: location }}
            replace
        />
    );
};
export default PrivateRoute;

