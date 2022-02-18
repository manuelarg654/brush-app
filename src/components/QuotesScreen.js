import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDocsQuotes } from '../actions/quotesActions';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';


export const QuotesScreen = () => {

    const [enable, setEnable] = useState(false);

    const {loading, firstQuote, noquotes} = useSelector(state => state.ui);
    const quotes = useSelector(state => state.quotes);

    const { frase, traduccion } = quotes;
    const dispatch = useDispatch();

    useEffect(() => {

        if(firstQuote){
          dispatch( getAllDocsQuotes());
        }

    }, [firstQuote,dispatch ]);

    const handleNewWord =()=>{

        
        setEnable(false);
        dispatch( getAllDocsQuotes());
        

    }

    const handleTranslate =()=>{

        
        setEnable(!enable);

    }
    
    return (
        (!noquotes) ?
        <div className='practice-word-screen-container animate__animated animate__fadeIn'>
            
            <div className='words-container'>
            {( loading ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)
            :
            <div>
            <p className='animate__animated animate__zoomIn'>{frase}</p>
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
            >Nueva frase
            </button>
        </div>
        : <div className='practice-word-screen-container'>
        <Link to='/mquotes'>
            {/* <button className='btn button-36'>Añade una palabra</button> */}
            {/* <i className="fas fa-plus-circle"></i> */}
            <img className='plus-btn' src={plus} alt='add' />
        </Link>
        <p className='p-noAdd'>Añade una frase</p>
      </div>        
    )

}
