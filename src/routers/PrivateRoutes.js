import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({logged,children}) => {

    return (logged ? children : <Navigate to='/auth/login' />)
}
