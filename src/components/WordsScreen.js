import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDocs } from '../actions/wordsActions';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';


export const WordsScreen = () => {

    const [enable, setEnable] = useState(false);
    const words = useSelector(state => state.words);
    const {loading, firstWord, nowords }= useSelector(state => state.ui);
    const {infinitivo, traduccion} = words;
    
    console.log("Hola mundo desde C++")
    

    const dispatch = useDispatch();

    useEffect(() => {

        if(firstWord){
            dispatch(getAllDocs());
        }

    }, [firstWord, dispatch]);

    const handleNewWord =()=>{

        setEnable(false);
        dispatch(getAllDocs());
    }

    const handleTranslate =()=>{

        setEnable(!enable);
    }


    // The p tag will only make a new line on line-breaking characters like spaces, hyphens, and other punctuation. (Try inserting a space in the middle of your long asdf line.)
    
    return (
        (!nowords) ?
        <div className='practice-word-screen-container animate__animated animate__fadeIn'>
        
            <div className='words-container'>
            {( loading ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)
            :
            <div>
            <p className='animate__animated animate__zoomIn'>{infinitivo}</p>
            </div>
            )}
            </div>
            {(enable && <p className='p-traduccion animate__animated animate__bounceIn'>{traduccion}</p>)}
            <button
            className='btn button-36'
            onClick={handleTranslate}
            >
               {( enable ? "ocultar traducción" : "ver traducción" )}
            </button>
            <button
            className='button-36'
            onClick={ handleNewWord }
            >Nueva palabra
            </button>
        </div>
        : <div className='practice-word-screen-container'>
            <Link to='/mwords'>
                {/* <button className='btn button-36'>Añade una palabra</button> */}
                {/* <i className="fas fa-plus-circle"></i> */}
                <img className='plus-btn' src={plus} alt='add' />
            </Link>
            
            <p className='p-noAdd'>Añade una palabra</p>
          </div>
    )
}
