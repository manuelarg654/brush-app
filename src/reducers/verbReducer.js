import { types } from "../types/types";

const initialState = {}

export const verbReducer = (state = initialState, action) => {


    switch ( action.type ) {
        case types.addVerb:{

            return(action.payload);
        }

        case types.randomVerb :{
            return(action.payload);
        }

        case types.clearVerbs :{
            return({});
        }

        case types.lastAddedVerb:{
            return(action.payload)
        }

        case types.allVerbs:{
            return({
                ...state,
                allVerbs:action.payload
            });
        }

        case types.deleteVerbsfromAllVerbs: {
            return({
                ...state,
                allVerbs: state.allVerbs.map(el => el.filter(verb => verb.id !== action.payload))
            });
        }

    
        default:
            return state;
    }

};
