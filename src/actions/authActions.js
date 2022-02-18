
import {confirmPasswordReset, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { clearPhrasalVerbs } from './phrasalVerbsActions';
import { clearQuotes } from './quotesActions';
import { clearFirstElement, clearFirstPhrasalVerb, clearFirstQuote, clearFirstVerb, modifyContainerMounted } from './uiActions';
import { clearVerbs } from './VerbsActions';
import { clearWords } from './wordsActions';
import Swal from 'sweetalert2';




export const AsyncRegisterNewUser =(username, email, password)=>{

    return((dispatch)=>{

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then( async({user})=>{
            await updateProfile(user,{
                displayName: username,
            })
            dispatch(
                login(user.uid, user.displayName)
            )
            
        })


    })

}

export const AsyncLoginWithEmail =(email, password)=>{

    return((dispatch)=>{


        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(login(user.uid, user.displayName));
        })
        .catch((e)=>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Correo o Contraseña Incorrecta",
                showConfirmButton: false,
                timer: 2500
              });
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
            console.log(e);
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
            url: 'http://localhost:3000/auth/login'
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
