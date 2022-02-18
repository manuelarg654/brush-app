import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { finishLoading, firstVerb, startLoading } from "./uiActions";
import { paginate } from "../utils/paginate";

export const AddNewVerb =(presente,pasado,pparticipio,traduccion)=>{

    return( async (dispatch, getState)=>{

        const {uid} = getState().auth;

        Swal.fire({
            title:'Guardando verbo',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const newVerb = {
            presente,
            pasado,
            pparticipio,
            traduccion
        }

        await addDoc( collection(db,`${uid}`,'reviewer/verbs'), newVerb);
        dispatch( lastAddedVerb(newVerb));
        dispatch(verbs());
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'verbo agregado',
            showConfirmButton: false,
            timer: 1500
          });
        

    })



}

export const getAllVerbsDocs = () =>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading ())
        const {uid} = getState().auth;
        // const {infinitivo} = getState().words;
        

        const docs = await getDocs(collection(db,`${uid}/reviewer/verbs`));
        let num = docs.size;
        if(num === 0){
            dispatch(finishLoading());
            dispatch( noVerbs());
            return;
        }else{

        
                
        let random = Math.floor(Math.random() * num );

        let verbss = [];

        docs.forEach((doc)=>{
            verbss.push(doc.data());
        })

        
        dispatch(getRandomVerb(verbss[random])); 
        dispatch(finishLoading());
        dispatch(firstVerb());
        dispatch(verbs());
        }
        

    })

}

export const getAllVerbsForTable =()=>{

    return(async(dispatch, getState)=>{

        dispatch(startLoading());
        const {uid} = getState().auth;
        const docs = await getDocs(collection(db,`${uid}/reviewer/verbs`));

        if(docs.size === 0){
            dispatch(noVerbs());
        }
        function sortArray(x, y) {
              if (x.presente < y.presente) { return -1; }
              if (x.presente > y.presente) { return 1; }
              return 0;
            }
        
        let allVerbs = [];

        docs.forEach((doc)=>{

            let verb = {
                ...doc.data(),
                id:doc.id
            }
            allVerbs.push(verb);

        })

        allVerbs.sort(sortArray);

        let verbsArray = paginate(allVerbs);
        dispatch(setAllVerbs(verbsArray));
        dispatch(finishLoading());


    })

}

export const AsyncDeleteVerb =(verbId)=>{

    return(async(dispatch, getState)=>{

        Swal.fire({
            title:'Eliminando verbo',
            text:'Por favor espere...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: ()=>{
                Swal.showLoading();
            }
        })

        const {uid} = getState().auth;
        
        const verbRef = doc(db,`${uid}/reviewer/verbs/${verbId}`);
        const docs = await getDocs(collection(db,`${uid}/reviewer/verbs`));
        if(docs.size === 1){
            dispatch(noVerbs(verbId));
        }
        await deleteDoc(verbRef);
        dispatch(deleteVerb(verbId));
        Swal.close();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'verbo eliminado',
            showConfirmButton: false,
            timer: 1500
          })

    })


}





export const getRandomVerb = (randomVerb)=>{


    return({
        type: types.randomVerb,
        payload: {
            ...randomVerb
        }
    })

}


export const lastAddedVerb = (newVerb) =>{

    return({
        type: types.lastAddedVerb,
        payload: newVerb
    })


}

export const clearVerbs =()=>{

    return({
        type: types.clearVerbs
    })

}


export const noVerbs = () =>{

    return({
        type: types.noVerbs
    })

}
export const verbs = () =>{

    return({
        type: types.verbs
    })

}

export const deleteVerb =(verbId)=>{
    return({
        type: types.deleteVerbsfromAllVerbs,
        payload: verbId
    })
}

export const setAllVerbs =(allVerbs)=>{

    return({
        type: types.allVerbs,
        payload:allVerbs
    })

}

