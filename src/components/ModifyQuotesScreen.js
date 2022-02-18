import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';
import { AsyncDeleteQuote, getAllQuotesForTable } from '../actions/quotesActions';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { modifyContainerMounted } from '../actions/uiActions';

export const ModifyQuotesScreen = () => {

  const dispatch = useDispatch();
  const {allQuotes} = useSelector(state => state.quotes);
  const { loading, noquotes } = useSelector(state => state.ui);
  const [page, setPage] = useState(0);


  useEffect(() => {

    dispatch(getAllQuotesForTable());

    if(!noquotes){ 
      dispatch(modifyContainerMounted(true));
    }

    return () =>{
      dispatch(modifyContainerMounted(false));
    }

  }, [dispatch, noquotes]);


  const handleNextPage =()=>{
    setPage((oldPage) =>{

      let nextPage = oldPage + 1;
      if(nextPage > allQuotes.length -1){
        nextPage = 0;
      }
      return nextPage;
    })

  }

  const handlePrevPage =()=>{
    setPage((oldPage) =>{

      let prevPage = oldPage - 1;
      if(prevPage < 0){
        prevPage = allQuotes.length -1;
      }
      return prevPage;
    })

  }


  const handleDelete = (e, id) => {


    dispatch(AsyncDeleteQuote(id));


  }

  return (
    (!noquotes) ?
      (loading) ? (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
        : <div className='table-container animate__animated animate__fadeIn'>
          <table className='table'>
            <thead>
            <tr>
              <th>frase</th>
              <th>traduccion</th>
              <th>acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                allQuotes && allQuotes[page].map((word) => {

                  const { id, frase, traduccion } = word;

                  return (
                    <tr key={id} >
                      <td data-label='frase'>{frase}</td>
                      <td data-label='traduccion'>{traduccion}</td>
                      <td data-label='acciones' className='td-delete'
                        onClick={(e) => handleDelete(e, id)}>
                          <RiDeleteBin7Fill
                          className='td-delete'
                      />
                        </td>
                    </tr>
                  )
                })
              }
              { allQuotes &&
              <tr><td colSpan="3" className='last-table-row'>
              <span onClick={handlePrevPage} className='table-btn flipped-icon'>&#10148;</span>
              <span className='table-btn counter-span'>{ `${page + 1} de ${allQuotes.length}` }</span>
              <span onClick={handleNextPage} className='table-btn'>&#10148;</span>
              </td></tr>
              }
            </tbody>
          </table>
        </div>
      : <div className='practice-word-screen-container'>
        <Link to='/modifyquotes'>
          <img className='plus-btn' src={plus} alt='add' />
        </Link>

        <p className='p-noAdd'>Añade una frase</p>
      </div>
  )

};
