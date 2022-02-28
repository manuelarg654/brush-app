import React from 'react';
import { useDispatch} from "react-redux";
import AppLogo from '../../assets/brushAPPLogo.PNG';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AsyncForgotPassword } from '../../actions/authActions';
import validator from 'validator';
import Swal from 'sweetalert2';

export const ForgotPasswordScreen = () => {

    const dispatch = useDispatch();

    const [ values, handleInputChange, reset ] = useForm({
        email:'',
    });

    const {email} = values;
    


    const handleSubmit =(e)=>{

        e.preventDefault();
        if(isFormValid()){
            dispatch( AsyncForgotPassword(email));
            reset();
        }
    }

    const isFormValid = () =>{


        if(!validator.isEmail(email)){

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El correo no es correcto',
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
                    <p className='p-account'>Introduce tu correo</p>
                    <input
                    type='text'
                    placeholder='Correo electrónico'
                    value={email}
                    name='email'
                    onChange={handleInputChange}
                    />
                    <button
                    type='submit'
                    >Submit</button>
                    <Link to='/auth/login'><p className='p-create-account'>- Already registered? -</p></Link>
                    <p className='p-creator-label'><a href='https://manu.com.co/index.html' target='_blank'>by manu.com.co</a></p>
                </form>
            </div>
        </div>
    )
}
