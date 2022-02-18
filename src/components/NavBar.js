import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AsyncLogout } from '../actions/authActions';
import userProfilePicture from '../assets/profile-picture.jpg';
import { links, linksB, linksC } from '../utils/constants';
import { FaTimes } from 'react-icons/fa';
import { GoSignIn } from "react-icons/go";
import { closeSidebar } from '../actions/uiActions';

export const NavBar = () => {

    const auth = useSelector(state => state.auth);
    const {sidebar} = useSelector(state => state.ui);
    const dispatch = useDispatch();
    
    const { userImage } = auth;

    const handleLogout =()=>{
        dispatch( AsyncLogout());
    }

    const handleCloseSidebar =()=>{
        dispatch( closeSidebar() )
    }

    const handleCloseNavbar =()=>{
        dispatch( closeSidebar());
    }
    
    return (
        <nav className={ `${sidebar ? 'open-sidebar': 'close-sidebar'} navbar` }>
            <div className='navbar-logo-container'>
            <div>
                <img src={!userImage ? `${userProfilePicture}` : `${userImage}` } alt='user' className='user-image' />
                <p>Bienvenid@</p>
                <p>{ auth.name}</p>
            </div>
            <button
            className='navbar-logo-container-closebtn'
            onClick={handleCloseSidebar}
            >
                <FaTimes />
            </button>
            </div>
            <div className='navbar-menu-container'>
                <ul className='navbar-links'>
                    <h2>REPASAR</h2>
                    {
                        links.map((link)=>{

                            const { id, text, url} = link;

                            return(
                                <Link to={url}>
                                <li className='navbar-link' key={id} onClick={handleCloseNavbar}>
                                <Link to={url} className=''>
                                </Link>
                                {text}
                                </li>
                                </Link>
                                
                            )
                        })
                    }
                    
                    <h2>AÑADIR</h2>
                    {
                        linksB.map((link) =>{

                            const { id, text, url } = link;

                            return(
                                <Link to={url}>
                                <li className='navbar-link' key={id} onClick={handleCloseNavbar}>
                                <Link to={url} className=''>
                                </Link>
                                {text}
                                </li>
                                </Link>
                            )
                        })
                    }
                    <h2>CONFIGURAR</h2>
                    {
                        linksC.map((link)=>{

                        const { id, text, url } = link; 

                            return(
                                <Link to={url}>
                                <li className='navbar-link' key={id} onClick={handleCloseNavbar}>
                                <Link to={url} className=''>
                                </Link>
                                {text}
                                </li>
                                </Link>
                            )
                        })
                    }
                </ul>
                

            </div>
            <div
            className='signout-wrapper'
            onClick={handleLogout}
            >
                {/* <p className='p-configuracion'><Link to='/config' className='p-configuracion-link'>Configuración</Link></p>
                <p
                 onClick={handleLogout}
                 className='p-logout'
                >Cerrar sesión</p> */}
                <GoSignIn />
            </div>
         
        </nav>
    )
}
