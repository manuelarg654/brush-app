import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { finishLoading, firstQuote, startLoading } from "./uiActions";
import { paginate } from "../utils/paginate";




export const addNewQuote = (frase, traduccion) =>{

    return(async (dispatch, getState)=>{

        const {uid} = getState().auth;
        

        Swal.fire({
            title:'Guardando Frase',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const newQuote = {
            frase,
            traduccion
        }

        await addDoc(collection(db,`${uid}`,"reviewer/quotes"), newQuote);
        dispatch(lastAddedQuote(newQuote));
        dispatch(quotes());

        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'frase Agregada',
            showConfirmButton: false,
            timer: 1500
          });
    })

}

export const getAllQuotesForTable =()=>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading());
        const {uid} = getState().auth;
        const docs = await getDocs(collection(db,`${uid}/reviewer/quotes`));

        if(docs.size === 0){
            dispatch(noQuotes());
        }
        function sortArray(x, y) {
            if (x.frase < y.frase) { return -1; }
            if (x.frase > y.frase) { return 1; }
            return 0;
          }
        
        let allQuotes = [];

        docs.forEach((doc)=>{

            let quote = {
                ...doc.data(),
                id:doc.id
            }
            allQuotes.push(quote);
        })

        allQuotes.sort(sortArray);
        let quotesArray = paginate(allQuotes);

        dispatch(setAllQuotes(quotesArray));
        dispatch(finishLoading());


    })

}

export const getAllDocsQuotes = () =>{

    return(async(dispatch, getState)=>{

        dispatch( startLoading())
        const {uid} = getState().auth;

        const docs = await getDocs(collection(db,`${uid}/reviewer/quotes`));
        let num = docs.size;
        if(num === 0){
            dispatch(finishLoading());
            dispatch(noQuotes());
            return;
        }else{

        

        let random = Math.floor(Math.random() * num );
        // console.log(random);
        // console.log(docs);
        let quotess = [];

        docs.forEach((doc)=>{
            quotess.push(doc.data());
        })
        
            dispatch(getRandomQuote(quotess[random])); 
            dispatch(finishLoading());
            dispatch(firstQuote());
            dispatch(quotes());
        }

    })
    

}

export const AsyncDeleteQuote =(quoteId)=>{

    return(async(dispatch, getState)=>{

        Swal.fire({
            title:'Eliminando frase',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const {uid} = getState().auth;
        
        const quoteRef = doc(db,`${uid}/reviewer/quotes/${quoteId}`);
        const docs = await getDocs(collection(db,`${uid}/reviewer/quotes`));
        if(docs.size === 1){
            dispatch( noQuotes()); 
        }
        await deleteDoc(quoteRef);
        dispatch(deleteQuote(quoteId));
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'frase eliminada',
            showConfirmButton: false,
            timer: 1500
          })

    })


}

export const getRandomQuote =(randomQuote)=>{


    return({
        type: types.randomQuote,
        payload: {
            ...randomQuote
        }
    })

}


export const lastAddedQuote = (quote) => {

    
    return({
        type: types.lastAddedQuote,
        payload:{
            ...quote
        }
    })

}

export const clearQuotes =()=>{

    return({
        type: types.clearQuotes
    })

}


export const noQuotes = () =>{

    return({
        type: types.noQuotes
    })

}
export const quotes = () =>{

    return({
        type: types.quotes
    })

}

export const deleteQuote =(quoteId)=>{
    return({
        type: types.deleteQuotesfromAllQuotes,
        payload: quoteId
    })
}

export const setAllQuotes =(allQuotes)=>{

    return({
        type: types.allQuotes,
        payload:allQuotes
    })

}
