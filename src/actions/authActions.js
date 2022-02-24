
import {confirmPasswordReset, createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { clearPhrasalVerbs } from './phrasalVerbsActions';
import { clearQuotes } from './quotesActions';
import { clearFirstElement, clearFirstPhrasalVerb, clearFirstQuote, clearFirstVerb, modifyContainerMounted } from './uiActions';
import { clearVerbs } from './VerbsActions';
import { clearWords } from './wordsActions';
import Swal from 'sweetalert2';

export const AsyncRegisterNewUser =(username, email, password)=>{
    

    return(()=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then( async({user})=>{
            await updateProfile(user,{
                displayName: username,
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuario creado exitosamente, Verifica tu correo.",
                showConfirmButton: false,
                timer: 2500
              });
              sendEmailVerification(auth.currentUser)
        })
        .catch((e)=>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${e}`,
                showConfirmButton: false,
                timer: 2500
              });
              
        })

    })

    

}

export const AsyncLoginWithEmail =(email, password)=>{

    return((dispatch)=>{


        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            if(user.emailVerified === true){
                dispatch(login(user.uid, user.displayName));
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Verifica tu correo para iniciar sesión`,
                    showConfirmButton: false,
                    timer: 2500
                  });
            }
            
        })
        .catch((err)=>{
            console.log(err.message)
            if(err.message === `Firebase: Error (auth/user-not-found).`){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `El correo usado no tiene cuenta creada`,
                showConfirmButton: false,
                timer: 2500
              });
            }
            else if(err.message === `Firebase: Error (auth/wrong-password).`){
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Contraseña incorrecta`,
            showConfirmButton: false,
            timer: 2000
            });
            }
            else if(err.message === `Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).`){
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: `El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.`,
            showConfirmButton: false,
            timer: 8500
            });
            }
            

        })
    })

}


export const AsyncLoginWithGoogle =()=>{

    return((dispatch) =>{

        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
        .then(({user}) =>{
            dispatch(login(user.uid, user.displayName, user.photoURL));
        })
        .catch((e)=>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${e}`,
                showConfirmButton: false,
                timer: 2500
              });
        })

    })
}


export const AsyncLogout =()=>{

    return((dispatch)=>{

        const auth = getAuth();
        auth.signOut()
        .then(()=>{
            dispatch(logout());
            dispatch(clearWords());
            dispatch(clearVerbs());
            dispatch(clearPhrasalVerbs());
            dispatch(clearQuotes());
            dispatch(clearFirstElement());
            dispatch(clearFirstVerb());
            dispatch(clearFirstPhrasalVerb());
            dispatch(clearFirstQuote());
            dispatch(modifyContainerMounted(false));
            
        })

    })

}

export const AsyncForgotPassword =(email)=>{

    return((dispatch)=>{

        const auth = getAuth();
        sendPasswordResetEmail(auth, email, {
            //that url is used for the continue button when password has been changed
            url: 'https://brush-app.com/auth/login'
        })
        .then((res)=>{

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Email enviado exitosamente, revisa tu correo",
                showConfirmButton: false,
                timer: 2500
              });

        })
        .catch((err)=>{
            
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `${err}`,
                showConfirmButton: false,
                timer: 2500
              });
        })

    })

}

export const asyncResetPassword =(oobCode, password)=>{

    return((dispatch)=>{

        const auth = getAuth();
        confirmPasswordReset(auth,oobCode, password)
        .then((res)=>{

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Password cambiado exitosamente",
                showConfirmButton: false,
                timer: 2500
              })
        })     
        .catch((err)=>{
            console.log(err.message)
            if( err.message === `Firebase: Error (auth/weak-password).`){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `La contraseña es muy débil`,
                showConfirmButton: false,
                timer: 2500
              });
            }
            if( err.message === `Firebase: Error (auth/invalid-action-code).`){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: `Código expirado, solicita nuevo link a tu correo.`,
                showConfirmButton: false,
                timer: 2500
              });
            }
           })
           
        
        

    })

}


export const login = (uid, displayName, userImage)=>{

    return({
        type: types.login,
        payload:{
            uid,
            displayName,
            userImage
        }
    })
    

}


export const logout =()=>{

    return({
        type: types.logout
    })

}
