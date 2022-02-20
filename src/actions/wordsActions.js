import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { finishLoading, firstElement, startLoading } from "./uiActions";
import { paginate } from "../utils/paginate";



export const addNewWord = (infinitivo, traduccion) =>{

    return( async(dispatch, getState) =>{

        const {uid} = getState().auth;
        
        Swal.fire({
            title:'Guardando Palabra',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const newWord = {
            infinitivo,
            traduccion,
        }

        await addDoc( collection(db,`${uid}`,"reviewer/words"), newWord);
        Swal.close();
        dispatch(lastAddedWord(newWord));
        dispatch(words());
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'palabra Agregada',
            showConfirmButton: false,
            timer: 1500
          });


    })

}


export const getAllDocs = () =>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading());
        const {uid} = getState().auth;
        
        const docs = await getDocs(collection(db,`${uid}/reviewer/words`));
        let num = docs.size;

        if(num === 0){
            dispatch(finishLoading());
            dispatch(noWords());
            return;
        }else{

        
        
        let random = Math.floor(Math.random() * num );
        // console.log(random);
        // console.log(docs);
        let wordss = [];

        docs.forEach((doc)=>{
            wordss.push(doc.data());
        })

        
        dispatch(getRandomWord(wordss[random])); 
        dispatch(finishLoading());
        dispatch(firstElement());
        dispatch(words());

    }

    })

}

export const AsyncDeleteWord =(wordId)=>{

    return(async(dispatch, getState)=>{

        Swal.fire({
            title:'Eliminando Palabra',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const {uid} = getState().auth;
        
        const wordRef = doc(db,`${uid}/reviewer/words/${wordId}`);
        const docs = await getDocs(collection(db,`${uid}/reviewer/words`));
        if(docs.size === 1){
            dispatch(noWords()); 
        }
        await deleteDoc(wordRef);
        dispatch(deleteWord(wordId))
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'palabra eliminada',
            showConfirmButton: false,
            timer: 1500
          })

    })


}

export const getAllDocsForTable =()=>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading());
        const {uid} = getState().auth;
        const docs = await getDocs(collection(db,`${uid}/reviewer/words`));

        if(docs.size === 0){
            dispatch(noWords());
        }
        function sortArray(x, y) {
            if (x.infinitivo < y.infinitivo) { return -1; }
            if (x.infinitivo > y.infinitivo) { return 1; }
            return 0;
          }
        
        let allWords = [];

        docs.forEach((doc)=>{

            let word = {
                ...doc.data(),
                id:doc.id
            }
            allWords.push(word);
        })

        allWords.sort(sortArray);
        let wordsArray = paginate(allWords);

        dispatch(setAllWords(wordsArray));
        dispatch(finishLoading());


    })

}


export const getRandomWord =(randomWord)=>{


    return({
        type: types.randomWord,
        payload: {
            ...randomWord
        }
    })

}

export const lastAddedWord =(word)=>{

    return({
        type: types.lastAddedWord,
        payload:{
            ...word
        }
    })

}

export const clearWords =()=>{

    return({
        type: types.clearWords
    })

}
export const words = () =>{

    return({
        type: types.words
    })

}

export const noWords = () =>{

    return({
        type: types.noWords
    })

}


export const deleteWord =(wordId)=>{
    return({
        type: types.deleteWordfromAllwords,
        payload: wordId
    })
}

export const setAllWords =(allWords)=>{

    return({
        type: types.allWords,
        payload:allWords
    })

}