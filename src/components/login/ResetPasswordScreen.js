import React from 'react';
import { useDispatch} from "react-redux";
import AppLogo from '../../assets/brushAPPLogo.PNG';
import { Link, useLocation} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { asyncResetPassword } from '../../actions/authActions';



export const ResetPasswordScreen = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const oobCode = query.get('oobCode');

    const [ values, handleInputChange, reset ] = useForm({
        password:"",
        confirmedPassword:'',
    });

    const {password, confirmedPassword } = values;

    const handleSubmit =(e)=>{

        e.preventDefault();
            dispatch(asyncResetPassword(oobCode, password));
            reset();
            
    }

    return (
        <div className='login-screen-container'>
            
            <div className='login-form-container animate__animated animate__fadeIn'>
            
                <form
                onSubmit={handleSubmit}
                className='login-form'>
                    <img src={AppLogo} alt='logo' />
                    <p className='p-account'>Introduce una nueva contraseña</p>
                    <input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    name='password'
                    onChange={handleInputChange}
                    />
                    <input
                    type='password'
                    placeholder='Confirmar contraseña'
                    value={confirmedPassword}
                    name='confirmedPassword'
                    onChange={handleInputChange}
                    />
                    <button
                    type='submit'
                    >Cambiar Contraseña</button>
                    <Link to='/auth/login'><p className='p-create-account'>- Return to login -</p></Link>
                </form>
                <p className='p-creator-label'><a href='https://manu.com.co/index.html' target='_blank'>by manu.com.co</a></p>
            </div>
        </div>
    )
}
