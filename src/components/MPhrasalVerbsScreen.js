import { addPhrasalVerb } from "../actions/phrasalVerbsActions";
import { useForm } from "../hooks/useForm";
import { useDispatch } from 'react-redux';

export const MPhrasalVerbsScreen = () => {

    const dispatch = useDispatch();


    const [ values, handleInputChange, reset ] = useForm({
        verboFrasal:"",
        traduccion: "",
      });

    const { verboFrasal, traduccion } = values;

    const handleSubmit = (e) =>{
        e.preventDefault();
      }

    const handleAddPhrasalVerb = () =>{

        if(verboFrasal <= 1 || traduccion <=1){
            console.log("infinitivo/traducción es obligatorio");
            return;
          }

        dispatch(addPhrasalVerb(verboFrasal,traduccion));
        reset();
    }


    return (
        <div className='add-element-wrapper'>
            <div className='add-element-wrapper-container'>
            <form onSubmit={handleSubmit}>
            <h2>Agrega un verbo frasal</h2>
                <input
                type='text'
                maxLength="30"
                placeholder="verbos frasal"
                value={verboFrasal}
                name='verboFrasal'
                onChange={handleInputChange}
                 />

                <input
                type='text'
                maxLength="60"
                placeholder="traduccion, traduccion"
                value={traduccion}
                name='traduccion'
                onChange={handleInputChange}
                 />
                 <button
                 onClick={handleAddPhrasalVerb}
                 >Guardar</button>
            </form>
            </div>
        </div>

    )


};
