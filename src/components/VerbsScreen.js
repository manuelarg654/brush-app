import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVerbsDocs } from '../actions/VerbsActions';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';

export const VerbsScreen = () => {


  const dispatch = useDispatch();

  const [enable, setEnable] = useState(false);
  const { loading, firstVerb, noverbs } = useSelector(state => state.ui);
  const verbs = useSelector(state => state.verbs);



  const { pasado, presente, pparticipio, traduccion } = verbs;

  useEffect(() => {

    if (firstVerb) {
      dispatch(getAllVerbsDocs());
    }

  }, [firstVerb, dispatch]);



  const handleNewVerb = () => {

    setEnable(false);
    dispatch(getAllVerbsDocs());

  }

  const handleTranslate = () => {

    setEnable(!enable);

  }


  return (
    (!noverbs) ?
      <div className='practice-word-screen-container animate__animated animate__fadeIn'>

        <div className='words-container'>
          {(loading ? (<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>)
            :
            <div>
              <p className='animate__animated animate__zoomIn'>{presente}</p>
              <p className='animate__animated animate__zoomIn'>{pasado}</p>
              <p className='animate__animated animate__zoomIn'>{pparticipio}</p>
            </div>
          )}
        </div>
        {(enable && <p className='p-traduccion animate__animated animate__bounceIn'>{traduccion}</p>)}
        <button
          className='btn button-36'
          onClick={handleTranslate}
        >
          {(enable ? "ocultar traducción" : "ver traducción")}
        </button>
        <button
          className='button-36'
          onClick={handleNewVerb}
        >Nueva palabra
        </button>
      </div>
      : <div className='practice-word-screen-container'>
        <Link to='/mverbs'>
          <img className='plus-btn' src={plus} alt='add' />
        </Link>

        <p className='p-noAdd'>Añade un verbo</p>
      </div>
  )

};
