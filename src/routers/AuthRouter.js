import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ForgotPasswordScreen } from '../components/login/ForgotPasswordScreen';
import { LoginScreen } from '../components/login/LoginScreen';
import { RegisterScreen } from '../components/login/RegisterScreen';
import { ResetPasswordScreen } from '../components/login/ResetPasswordScreen';

export const AuthRouter = () => {

    return (
        <Routes>
            <Route path='login' element={ <LoginScreen /> } />
            <Route path='register' element={ <RegisterScreen /> } />
            <Route path='forgot-password' element={ <ForgotPasswordScreen /> } />
            <Route path='reset-password' element={ <ResetPasswordScreen /> } />

            <Route path='*' element={ <Navigate to='login' /> } />
        </Routes>
    )
}
