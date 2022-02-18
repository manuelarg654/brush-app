
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';
import { wordsReducer } from '../reducers/wordsReducer';
import { uiReducer } from '../reducers/uiReducer';
import { quotesReducer } from '../reducers/quotesReducer';
import { verbReducer } from '../reducers/verbReducer';
import { phrasalVerbsReducer } from '../reducers/phrasalVerbsReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    auth: authReducer,
    words: wordsReducer,
    ui: uiReducer,
    quotes: quotesReducer,
    verbs: verbReducer,
    phrasalVerbs: phrasalVerbsReducer
})


export const store = createStore(

    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    
);
