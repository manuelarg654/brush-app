import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { paginate } from "../utils/paginate";
import { finishLoading, firstPhrasalVerb, startLoading } from "./uiActions";


export const addPhrasalVerb =(phrasalverb, traduccion)=>{

    
    return(async(dispatch, getState)=>{

        const {uid} = getState().auth;

        Swal.fire({
            title:'Guardando Verbo frasal',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })
    
        const newPhrasalVerb = {
            phrasalverb,
            traduccion,
        }
    
        await addDoc ( collection (db ,`${uid}`,"reviewer/phrasalverbs"), newPhrasalVerb);
        dispatch(phrasalVerbs());
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'verbo frasal agregado',
            showConfirmButton: false,
            timer: 1500
          });
        

    })


}

export const getAllPhrasalVerbsDocs = () =>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading())
        const {uid} = getState().auth;
        // const {infinitivo} = getState().words;
        

        const docs = await getDocs(collection(db,`${uid}/reviewer/phrasalverbs`));
        let num = docs.size;
        if(num === 0){
            dispatch(finishLoading());
            dispatch(noPhrasalVerbs());
            return;
        }else{

        
        let random = Math.floor(Math.random() * num );
        // console.log(random);
        // console.log(docs);
        let phrasalVerbss = [];

        docs.forEach((doc)=>{
            phrasalVerbss.push(doc.data());
        })

        
        dispatch(getRandomPhrasalVerb(phrasalVerbss[random])); 
        dispatch(finishLoading());
        dispatch(firstPhrasalVerb());
        dispatch(phrasalVerbs());
      }

    })

}

export const getAllPhrasalVerbsForTable = () =>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading());
        const {uid} = getState().auth;
        const docs = await getDocs(collection(db,`${uid}/reviewer/phrasalverbs`));

        if(docs.size === 0){
            dispatch(noPhrasalVerbs());
        }
        function sortArray(x, y) {
            if (x.phrasalverb < y.phrasalverb) { return -1; }
            if (x.phrasalverb > y.phrasalverb) { return 1; }
            return 0;
          }
        
        let allPhrasalVerbs = [];

        docs.forEach((doc)=>{

            let phrasalverb = {
                ...doc.data(),
                id:doc.id
            }
            allPhrasalVerbs.push(phrasalverb);
        })

        allPhrasalVerbs.sort(sortArray);
        let phrasalVerbsArray = paginate(allPhrasalVerbs);

        dispatch(setAllPhrasalVerbs(phrasalVerbsArray));
        dispatch(finishLoading());


    })

}

export const AsyncDeletePhrasalVerb =(phrasalVerbId)=>{

    return(async(dispatch, getState)=>{

        Swal.fire({
            title:'Eliminando verbo frasal',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const {uid} = getState().auth;
        
        const phrasalVerbRef = doc(db,`${uid}/reviewer/phrasalverbs/${phrasalVerbId}`);
        const docs = await getDocs(collection(db,`${uid}/reviewer/phrasalverbs`));
        if(docs.size === 1){
            dispatch(noPhrasalVerbs()); 
        }
        await deleteDoc(phrasalVerbRef);
        dispatch(deletePhrasalVerb(phrasalVerbId))
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'verbo frasal eliminado',
            showConfirmButton: false,
            timer: 1500
          })

    })


}

export const getRandomPhrasalVerb =(randomPhrasalVerb)=>{


    return({
        type: types.randomPhrasalVerb,
        payload: {
            ...randomPhrasalVerb
        }
    })

}

export const lastAddedPhrasalVerb = (newPhrasalVerb) =>{

    return({
        type: types.lastAddedPhrasalVerb,
        payload: newPhrasalVerb
    })


}

export const clearPhrasalVerbs =()=>{

    return({
        type: types.clearPhrasalVerbs
    })

}


export const noPhrasalVerbs = () =>{

    return({
        type: types.noPhrasalVerbs
    })

}
export const phrasalVerbs = () =>{

    return({
        type: types.phrasalverbs
    })

}

export const deletePhrasalVerb =(phrasalVerbId)=>{
    return({
        type: types.deletePhrasalverbsfromAllPhrasalVerbs,
        payload: phrasalVerbId
    })
}

export const setAllPhrasalVerbs =(allPhrasalVerbs)=>{

    return({
        type: types.allPhrasalVerbs,
        payload:allPhrasalVerbs
    })

}