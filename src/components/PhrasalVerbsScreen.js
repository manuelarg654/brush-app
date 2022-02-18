import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhrasalVerbsDocs } from '../actions/phrasalVerbsActions';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';

export const PhrasalVerbsScreen = () => {


    const dispatch = useDispatch();
    const [enable, setEnable] = useState(false);
    const phrasalVerbs = useSelector(state => state.phrasalVerbs);
    const {loading, firstPhrasalVerb, noPhrasalVerbs} = useSelector(state => state.ui);
    const {phrasalverb, traduccion} = phrasalVerbs;

    useEffect(() => {

        if(firstPhrasalVerb){
            dispatch(getAllPhrasalVerbsDocs());
        }


    }, [firstPhrasalVerb, dispatch]);



    const handleTranslate =()=>{

        setEnable(!enable);
    }

    const handleNewPhrasalVerb =()=>{

        
        setEnable(false);
        dispatch(getAllPhrasalVerbsDocs());
        

    }


  return (
    (!noPhrasalVerbs) ?
    <div className='practice-word-screen-container animate__animated animate__fadeIn'>
        
        <div className='words-container'>
        {( loading ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)
        :
        <div>
        <p className='animate__animated animate__zoomIn'>{phrasalverb}</p>
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
        onClick={ handleNewPhrasalVerb }
        >Nuevo verbo frasal
        </button>
    </div>
            : <div className='practice-word-screen-container'>
            <Link to='/mphrasalverbs'>

                <img className='plus-btn' src={plus} alt='add' />
            </Link>
            
            <p className='p-noAdd'>Añade un verbo frasal</p>
          </div>
)
};
