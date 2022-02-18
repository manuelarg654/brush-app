import React from 'react';
import { AddNewVerb } from '../actions/VerbsActions';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';

export const MVerbs = () => {


  const dispatch = useDispatch();

  const [ values, handleInputChange, reset ] = useForm({
    presente:'',
    pasado:'',
    pparticipio:'',
    traduccion:''
  });

  const { presente, pasado, pparticipio, traduccion } = values;

  const handleSubmit =(e)=>{

    e.preventDefault();
  }

  const handleAddVerb =()=>{
  
    dispatch(AddNewVerb(presente, pasado, pparticipio, traduccion));
    reset();
    
  }

  return(
    <div className='add-element-wrapper'>
      
      <div className='add-element-wrapper-container'>
        <form onSubmit={handleSubmit}>
        <h2>Agregar verbo</h2>
          <input
          type='text'
          maxLength="30"
          placeholder='presente'
          value={ presente }
          name='presente'
          onChange={handleInputChange}
          />
          <input
          type='text'
          maxLength="30"
          placeholder='pasado'
          value={ pasado }
          name='pasado'
          onChange={handleInputChange}
          />
          <input
          type='text'
          maxLength="30"
          placeholder='pasado participio'
          value={ pparticipio }
          name='pparticipio'
          onChange={handleInputChange}
          />
          <input
          type='text'
          maxLength="50"
          placeholder='traduccion'
          value={ traduccion }
          name='traduccion'
          onChange={handleInputChange}
          />
          <button onClick={handleAddVerb}>Guardar</button>
        </form>
      </div>
    </div>
  )
  
  
};
