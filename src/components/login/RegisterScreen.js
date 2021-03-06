import React from 'react';
import { useDispatch} from "react-redux";
import AppLogo from '../../assets/brushAPPLogo.PNG';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AsyncRegisterNewUser } from '../../actions/authActions';
import validator from 'validator';
import Swal from 'sweetalert2';



export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navegacion = useNavigate();

    const [ values, handleInputChange] = useForm({
        username: "",
        password:"",
        email:'',
        confirmedPassword:'',
    });

    const { username,email, password, confirmedPassword } = values;
    


    const handleSubmit =(e)=>{

        e.preventDefault();
        if(isFormValid()){
            
            dispatch( AsyncRegisterNewUser(username,email,password));
            // navegacion('/auth/login');
        }
        
        
    }

    const isFormValid = () =>{

        if(username.trim().length  === 0 ){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'el nombre de usuario es obligatorio',
                showConfirmButton: false,
                timer: 2500
              });
            return false;
        }

        else if(!validator.isEmail(email)){

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El correo no es correcto',
                showConfirmButton: false,
                timer: 2500
              });
            return false;

        }
        else if(password.length < 9){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El password es muy corto',
                showConfirmButton: false,
                timer: 2500
              });    

            return false;
        }

        else if(password !== confirmedPassword){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Contrase??as no coinciden',
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
                    placeholder='Nombre de usuario'
                    value={username}
                    name='username'
                    onChange={handleInputChange}
                    />
                    <input
                    type='text'
                    placeholder='Correo electr??nico'
                    value={email}
                    name='email'
                    onChange={handleInputChange}
                    />
                    <input
                    type='password'
                    placeholder='Contrase??a'
                    value={password}
                    name='password'
                    onChange={handleInputChange}
                    />
                    <input
                    type='password'
                    placeholder='Confirmar contrase??a'
                    value={confirmedPassword}
                    name='confirmedPassword'
                    onChange={handleInputChange}
                    />
                    <button
                    type='submit'
                    // onClick={handleRegister}
                    >Register</button>
                    <Link to='/auth/login'><p className='p-create-account'>- Already registered? -</p></Link>
                    <p className='p-creator-label'><a href='https://manu.com.co/index.html' target='_blank'>by manu.com.co</a></p>
                </form>
            </div>
        </div>
    )
}
