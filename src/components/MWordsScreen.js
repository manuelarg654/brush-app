import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addNewWord } from '../actions/wordsActions';
import { useForm } from '../hooks/useForm';

export const MWordsScreen = () => {

  const dispatch = useDispatch();

  const [ values, handleInputChange, reset ] = useForm({
    infinitivo:"",
    traduccion: "",
  });

  const { infinitivo, traduccion } = values;

  const handleSubmit = (e) =>{

    e.preventDefault();

  }

  const handleAddWord =()=>{

    if(infinitivo <= 0 || traduccion <=0){
      
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'infinitivo y traducción es obligatorio',
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }

    if(infinitivo.length === 30 && infinitivo.indexOf(" ") === -1){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'palabra agregada no válida',
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    if(traduccion.length === 45 && traduccion.indexOf(" ") === -1){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'palabra agregada no válida',
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }
    dispatch(addNewWord(infinitivo, traduccion ));
    reset();
    
  }

  return (
    <div className='add-element-wrapper '>

      <div className='add-element-wrapper-container'>
        
        <form onSubmit={handleSubmit} className='' >
        <h2>Agrega una palabra</h2>
          <input
          type='text'
          maxLength="30"
          placeholder='palabra en español'
          value={ infinitivo }
          name='infinitivo'
          onChange={handleInputChange}
          />
          <input
          type='text'
          maxLength="45"
          placeholder='traducción, traducción'
          value={ traduccion }
          name='traduccion'
          onChange={handleInputChange}
          />
          <button
          onClick={handleAddWord}
          >Guardar</button>
        </form>
      </div>

    </div>
  )
};
