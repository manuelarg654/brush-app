import { useForm } from "../hooks/useForm";
import { useDispatch} from 'react-redux';
import { addNewQuote } from "../actions/quotesActions";

export const MQuotesScreen = () => {

   const dispatch = useDispatch();

   

    const [ values, handleInputChange, reset ] = useForm({
        frase:"",
        traduccion:""
    })

    const {frase, traduccion} = values;

    const handleSubmit =(e)=>{
        e.preventDefault();
    }

    const handleAddQuote =()=>{

        dispatch( addNewQuote(frase,traduccion) );
        reset();


    }

    return(
        <div className='add-element-wrapper'>
            <div className='add-element-wrapper-container'>
            <form onSubmit={handleSubmit}>
            <h2>Agrega una frase</h2>
                <textarea
                placeholder='Añadir frase'
                maxLength="60"
                name='frase'
                value={frase}
                onChange={handleInputChange}
                />
                <textarea
                placeholder='Añadir traducción'
                maxLength="60"
                name='traduccion'
                value={traduccion}
                onChange={handleInputChange}
                />
                <button
                onClick={handleAddQuote}
                >Guardar</button>
            </form>
            </div>
        </div>
    )
    

 
};
