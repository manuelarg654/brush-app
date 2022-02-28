import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AsyncLoginWithEmail, AsyncLoginWithGoogle } from '../../actions/authActions';
import AppLogo from '../../assets/brushAPPLogo.PNG';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log(state);
    
    const [values, handleInputChange ] = useForm({
        email:"",
        password:"",
    });
    const { email, password } = values;
    

    const handleSubmit =(e)=>{

        e.preventDefault();
        if(e.nativeEvent.submitter.innerText === 'Sign In'){
        if(isFormValid()){
        dispatch(AsyncLoginWithEmail(email, password));
        }
       }
       else{
        dispatch( AsyncLoginWithGoogle());
       }
    }

    const isFormValid = () =>{

        if(email.trim().length  <= 0 ){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'el correo es obligatorio',
                showConfirmButton: false,
                timer: 2500
              });
            return false;
        }

        else if(password.trim().length  <= 0 ){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'La contraseña es obligatoria',
                showConfirmButton: false,
                timer: 2500
              });
            return false;
        }


          return true;

    }

    return (
        <div className='login-screen-container'>
            
            <div className='login-form-container animate__animated animate__fadeIn'>
            
                <form
                onSubmit={handleSubmit}
                className='login-form'>
                    <img src={AppLogo} alt='logo' />
                    <input
                    type='text'
                    value={email}
                    name='email'
                    onChange={handleInputChange}
                    placeholder='Correo electrónico'

                    />

                    <input
                    type='password'
                    placeholder='Contraseña'
                    value={password}
                    name='password'
                    onChange={handleInputChange}
                    />
                    
                    <button
                    type='submit'
                    >Sign In</button>
                    <Link to='/auth/forgot-password'><p className='p-forgot-password'>Forgot password?</p></Link>
                    <p>- or -</p>
                    <button
                    >Via Google</button>
                    <Link to='/auth/register'><p className='p-create-account'>- Create a new account -</p></Link>
                    <p className='p-creator-label'><a href='https://manu.com.co/index.html' target='_blank'>by manu.com.co</a></p>
                </form>
                
            </div>
            
        </div>
    )
}
