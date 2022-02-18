import { types } from "../types/types";

const initialState = {}

export const phrasalVerbsReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.addPhrasalVerb:{

            return(action.payload);
        }

        case types.randomPhrasalVerb:{
            return(action.payload);
        }

        case types.clearPhrasalVerbs :{
            return({});
        }

        case types.allPhrasalVerbs: {
            return({
                ...state,
                allPhrasalVerbs:action.payload
            });
        }

        case types.deletePhrasalverbsfromAllPhrasalVerbs: {
            return({
                ...state,
                allPhrasalVerbs: state.allPhrasalVerbs.map(el => el.filter(phrasalverb => phrasalverb.id !== action.payload))
            });
        }

    
        default:
           return state;
    }




};
