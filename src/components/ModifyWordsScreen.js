import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncDeleteWord, getAllDocsForTable } from '../actions/wordsActions';

import { RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';
import { modifyContainerMounted } from '../actions/uiActions';


export const ModifyWordsScreen = () => {

  const dispatch = useDispatch();
  const {allWords} = useSelector(state => state.words);
  const { loading, nowords } = useSelector(state => state.ui);
  const [page, setPage] = useState(0);

  useEffect(() => {

    dispatch(getAllDocsForTable());
    if(!nowords){
      
      dispatch(modifyContainerMounted(true));
    }

    return () =>{
      dispatch(modifyContainerMounted(false));
    }

  }, [dispatch, nowords]);



  const handleNextPage =()=>{
    

    setPage((oldPage) =>{

      let nextPage = oldPage + 1;

      if(nextPage > allWords.length -1){
        nextPage = 0;

      }
      
      return nextPage;
    })

  }
  
  const handlePrevPage =()=>{


    setPage((oldPage) =>{
      let prevPage = oldPage - 1;
      if(prevPage < 0){
        prevPage = allWords.length -1;
      }
      return prevPage;
    })
    
  }

  const handleDelete = (e, id) => {

    dispatch(AsyncDeleteWord(id));

  }

  return (
    (!nowords) ?
      (loading) ? (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
        : <div className='table-container animate__animated animate__fadeIn'>
          <table className='table'>
            <thead>
              <tr>
              <th>palabra</th>
              <th>traducción</th>
              <th>acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                allWords && allWords[page].map((word) => {

                  const { id, infinitivo, traduccion } = word;

                  return (
                    <tr key={id} >
                      <td data-label='palabra'>{infinitivo}</td>
                      <td data-label='traducción'>{traduccion}</td>
                      <td data-label='acciones' title="Eliminar palabra"
                        onClick={(e) => handleDelete(e, id)}>
                          <RiDeleteBin7Fill
                          className='td-delete'
                         />
                         </td>
                    </tr>
                  )
                })
              }
              {allWords && 
              <tr><td colSpan="3" className='last-table-row'>
                <span onClick={handlePrevPage} className='table-btn flipped-icon'>&#10148;</span>
                <span className='table-btn counter-span'>{ `${page +1} de ${allWords.length}` }</span>
                <span onClick={handleNextPage} className='table-btn'>&#10148;</span>
              </td></tr>
              }
            </tbody>
          </table>
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
};
