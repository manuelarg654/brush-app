import { types } from "../types/types";

const initialState = {}


export const quotesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.lastAddedQuote:{

            return({
                ...action.payload
            })

        }
        case types.randomQuote :{
            return(action.payload);
        }

        case types.clearWords :{
            return({});
        }

        case types.allQuotes: {
            return({
                ...state,
                allQuotes:action.payload
            });
        }
        case types.deleteQuotesfromAllQuotes: {
            return({
                ...state,
                allQuotes: state.allQuotes.map(el => el.filter(quote => quote.id !== action.payload))
            });
        }


        default:
            return state;
    }


  
};
