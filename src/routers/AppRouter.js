import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { login } from '../actions/authActions';
import { AuthRouter } from './AuthRouter';
import { DashBoardRoutes } from './DashBoardRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    const [logged, setLogged] = useState(false);

    
    const dispatch = useDispatch();


    useEffect(() => {

      const auth = getAuth();
      
      auth.onAuthStateChanged( async (user) =>{
        
        if(user?.uid){
          dispatch(login(user.uid, user.displayName))
          setLogged(true);
        }else{
          setLogged(false)
        }


      })
      
    }, [dispatch]);
    


    return (
        <BrowserRouter>
          <Routes>
              <Route path='auth/*' element={
                  <PublicRoutes logged={logged}>
                    <AuthRouter />
                  </PublicRoutes>
            }/>

              <Route path='/*' element={
                  <PrivateRoutes logged={logged}>
                    <DashBoardRoutes />
                  </PrivateRoutes>
            }/>
            <Route path='*' element={ <Navigate to='/' /> } />

          </Routes>
        </BrowserRouter>
    )
}
