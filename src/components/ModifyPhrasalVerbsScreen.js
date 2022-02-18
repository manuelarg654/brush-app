import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';
import { AsyncDeletePhrasalVerb, getAllPhrasalVerbsForTable } from '../actions/phrasalVerbsActions';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { modifyContainerMounted } from '../actions/uiActions';


export const ModifyPhrasalVerbsScreen = () => {


  const dispatch = useDispatch();
  const {allPhrasalVerbs} = useSelector(state => state.phrasalVerbs);
  const { loading, noPhrasalVerbs } = useSelector(state => state.ui);
  const [page, setPage] = useState(0);


  
  useEffect(() => {

    dispatch(getAllPhrasalVerbsForTable());

        if(!noPhrasalVerbs){ 
      dispatch(modifyContainerMounted(true));
    }

    return () =>{
      dispatch(modifyContainerMounted(false));
    }

  }, [dispatch, noPhrasalVerbs]);


  const handleNextPage =()=>{
    setPage((oldPage) =>{

      let nextPage = oldPage + 1;
      if(nextPage > allPhrasalVerbs.length -1){
        nextPage = 0;
      }
      return nextPage;
    })

  }

  const handlePrevPage =()=>{
    setPage((oldPage) =>{

      let prevPage = oldPage - 1;
      if(prevPage < 0){
        prevPage = allPhrasalVerbs.length -1;
      }
      return prevPage;
    })

  }


  const handleDelete = (e, id) => {

    dispatch(AsyncDeletePhrasalVerb(id));

  }

  return (
    (!noPhrasalVerbs) ?
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
                allPhrasalVerbs && allPhrasalVerbs[page].map((phrasalVerb) => {

                  const { id, phrasalverb, traduccion } = phrasalVerb;

                  return (
                    <tr key={id} >
                      <td data-label='palabra'>{phrasalverb}</td>
                      <td data-label='traducción'>{traduccion}</td>
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
              {
              allPhrasalVerbs &&
              <tr><td colSpan="3" className='last-table-row'>
              <span onClick={handlePrevPage} className='table-btn flipped-icon'>&#10148;</span>
                <span className='table-btn counter-span'>{ `${page + 1} de ${allPhrasalVerbs.length}` }</span>
                <span onClick={handleNextPage} className='table-btn'>&#10148;</span>
              </td></tr>
              }
            </tbody>
          </table>
        </div>
      : <div className='practice-word-screen-container'>
        <Link to='/modifyphrasalverbs'>
          <img className='plus-btn' src={plus} alt='add' />
        </Link>

        <p className='p-noAdd'>Añade una verbo frasal</p>
      </div>
  )

  
};
