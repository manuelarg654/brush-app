import { types } from "../types/types";

const initialState = {
    loading: false,
    firstVerb: true,
    firstPhrasalVerb: true,
    firstQuote: true,
    firstWord: true,

    nowords: false,
    noverbs: false,
    noPhrasalVerbs: false,
    noquotes: false,
    sidebar: true,
    containerMounted:false

}

export const uiReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.startLoading:

            return ({
                ...state,
                loading: true
            });

        case types.finishLoading:

            return ({
                ...state,
                loading: false
            });

        case types.firstElement:

            return ({
                ...state,
                firstWord: false
            });

        case types.firstVerb:

            return ({
                ...state,
                firstVerb: false
            });

        case types.firstPhrasalVerb:

            return ({
                ...state,
                firstPhrasalVerb: false
            });

        case types.firstQuote:

            return ({
                ...state,
                firstQuote: false
            });

        case types.clearfirstElement:

            return ({
                ...state,
                firstWord: true
            });

        case types.clearfirstVerb:

            return ({
                ...state,
                firstVerb: true
            });

        case types.clearfirstPhrasalVerb:

            return ({
                ...state,
                firstPhrasalVerb: true
            });

        case types.clearfirstQuote:

            return ({
                ...state,
                firstQuote: true
            });

        case types.noWords:

            return ({
                ...state,
                nowords: true
            });

        case types.words:

            return ({
                ...state,
                nowords: false
            });

        case types.noVerbs:

            return ({
                ...state,
                noverbs: true
            });

        case types.verbs:

            return ({
                ...state,
                noverbs: false
            });

        case types.noPhrasalVerbs:

            return ({
                ...state,
                noPhrasalVerbs: true
            });

        case types.phrasalverbs:

            return ({
                ...state,
                noPhrasalVerbs: false
            });


        case types.noQuotes:

            return ({
                ...state,
                noquotes: true
            });

        case types.quotes:

            return ({
                ...state,
                noquotes: false
            });

        case types.closeSidebar:

            return({
                ...state,
                sidebar: false
            })

        case types.openSidebar:

            return({
                ...state,
                sidebar: true
            })

        case types.modifyContainer:{

            return({
                ...state,
                containerMounted: action.payload,
            })

        }
        default:
            return state;
    }

};
