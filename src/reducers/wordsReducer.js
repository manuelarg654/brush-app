import { types } from "../types/types";

const initialState = {}

export const wordsReducer = (state = initialState, action) => {

    
    

    switch (action.type) {
        case types.randomWord:{
            return(action.payload);
        }

        case types.lastAddedWord :{
            return(action.payload);
        }

        case types.clearWords :{
            return({});
        }

        case types.allWords: {
            return({
                ...state,
                allWords:action.payload
            });
        }

        case types.deleteWordfromAllwords: {
            return({
                ...state,
                allWords: state.allWords.map(el => el.filter(word => word.id !== action.payload))
            });
        }

        
    
        default:
           return state;
    }





};