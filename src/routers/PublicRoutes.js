import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({logged,children}) => {

    

    return (!logged ? children: <Navigate to='/words' />)
    
}
