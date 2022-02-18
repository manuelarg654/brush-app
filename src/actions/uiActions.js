import { types } from "../types/types"



export const startLoading =()=> {

    return({
        type: types.startLoading,
    })


}


export const finishLoading =()=> {

    return({
        type: types.finishLoading,
    })


}



export const firstElement =()=>{
    return({
        type: types.firstElement
    })
}

export const firstVerb =()=>{
    return({
        type: types.firstVerb
    })
}

export const firstPhrasalVerb =()=>{
    return({
        type: types.firstPhrasalVerb
    })
}

export const firstQuote =()=>{
    return({
        type: types.firstQuote
    })
}

export const clearFirstElement =()=>{
    return({
        type: types.clearfirstElement
    })
}
export const clearFirstVerb =()=>{
    return({
        type: types.clearfirstVerb
    })
}
export const clearFirstPhrasalVerb =()=>{
    return({
        type: types.clearfirstPhrasalVerb
    })
}
export const clearFirstQuote =()=>{
    return({
        type: types.clearfirstQuote
    })
}

export const closeSidebar = () =>{

    return({
        type: types.closeSidebar
    })

}

export const openSidebar = () =>{

    return({
        type: types.openSidebar
    })

}

export const modifyContainerMounted =(bool)=>{

    return({
        type: types.modifyContainer,
        payload: bool
    })

}