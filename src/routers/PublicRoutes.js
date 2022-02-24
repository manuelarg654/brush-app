import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({logged,children}) => {

    const route = localStorage.getItem('lastPath') || '/words';

    // return (!logged ? children: <Navigate to='/words' />)

    return (!logged ? children: <Navigate to={route} />)
    
}
