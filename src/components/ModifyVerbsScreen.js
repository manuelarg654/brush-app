import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import plus from '../assets/plus.png';
import { AsyncDeleteVerb, getAllVerbsForTable } from '../actions/VerbsActions';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { modifyContainerMounted } from '../actions/uiActions';



export const ModifyVerbsScreen = () => {

  const dispatch = useDispatch();
  const {allVerbs} = useSelector(state => state.verbs);
  const { loading, noverbs } = useSelector(state => state.ui);
  const [page, setPage] = useState(0);

  




  useEffect(() => {

    dispatch(getAllVerbsForTable());

    if(!noverbs){ 
      dispatch(modifyContainerMounted(true));
    }
    
    return () =>{
      dispatch(modifyContainerMounted(false));
    }

  }, [dispatch, noverbs]);


  const handleNextPage =()=>{
    setPage((oldPage) =>{

      let nextPage = oldPage + 1;
      if(nextPage > allVerbs.length -1){
        nextPage = 0;
      }
      return nextPage;
    })

  }

  const handlePrevPage =()=>{
    setPage((oldPage) =>{

      let prevPage = oldPage - 1;
      if(prevPage < 0){
        prevPage = allVerbs.length -1;
      }
      return prevPage;
    })

  }


  const handleDelete = (e, id) => {

    // console.log(id)
    dispatch( AsyncDeleteVerb(id));
    // console.log(id)

  }

  return (
    
    (!noverbs) ?
      (loading) ? (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
        : <div className='table-container animate__animated animate__fadeIn'>
          <table className='table'>
            <thead>
            <tr>
              <th>presente</th>
              <th>pasado</th>
              <th>pasado participio</th>
              <th>traducción</th>
              <th>acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                allVerbs && allVerbs[page].map((verb) => {

                  const { id,pasado, pparticipio, presente, traduccion } = verb;

                  return (
                    <tr key={id} >
                      <td data-label='presente'>{presente}</td>
                      <td data-label='pasado'>{pasado}</td>
                      <td data-label='pasado participio'>{pparticipio}</td>
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
              { allVerbs && 
              <tr><td colSpan="5" className='last-table-row'>
              <span onClick={handlePrevPage} className='table-btn flipped-icon'>&#10148;</span>
                <span className='table-btn counter-span'>{ `${page +1} de ${allVerbs.length}` }</span>
                <span onClick={handleNextPage} className='table-btn'>&#10148;</span>
              </td></tr>
              }
            </tbody>
          </table>
        </div>
      : <div className='practice-word-screen-container'>
        <Link to='/modifyverbs'>
          {/* <button className='btn button-36'>Añade una palabra</button> */}
          {/* <i className="fas fa-plus-circle"></i> */}
          <img className='plus-btn' src={plus} alt='add' />
        </Link>

        <p className='p-noAdd'>Añade un verbo</p>
      </div>
  )

};
