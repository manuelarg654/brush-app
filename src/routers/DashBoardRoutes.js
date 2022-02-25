import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { QuotesScreen } from '../components/QuotesScreen';
import { WordsScreen } from '../components/WordsScreen';
import { MWordsScreen } from '../components/MWordsScreen';
import { MQuotesScreen } from '../components/MQuotesScreen';
import { MPhrasalVerbsScreen } from '../components/MPhrasalVerbsScreen';
import { VerbsScreen } from '../components/VerbsScreen';
import { MVerbs } from '../components/MVerbs';
import { PhrasalVerbsScreen } from '../components/PhrasalVerbsScreen';
import { ConfigScreen } from '../components/ConfigScreen';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar } from '../actions/uiActions';
import { ModifyWordsScreen } from '../components/ModifyWordsScreen';
import { ModifyPhrasalVerbsScreen } from '../components/ModifyPhrasalVerbsScreen';
import { ModifyQuotesScreen } from '../components/ModifyQuotesScreen';
import { ModifyVerbsScreen } from '../components/ModifyVerbsScreen';


export const DashBoardRoutes = () => {

    const location = useLocation();
    localStorage.setItem('lastPath', location.pathname);

    const dispatch = useDispatch();
    const { containerMounted } = useSelector(state => state.ui);


    const handleOpenSidebar =()=>{
        dispatch(openSidebar())
    }

    return (
        
        <div className='dashboard'>
        <NavBar />
        <button
        className='open-sidebar-btn'
        onClick={handleOpenSidebar}
        ><FaBars /></button>
        <div className={`${containerMounted ? `container-table` : `` } dashboard-right-content`}>
        
        <Routes>
            <Route path='words' element={ <WordsScreen /> } />
            <Route path='quotes' element={ <QuotesScreen /> } />
            <Route path='phrasalverbs' element={ <PhrasalVerbsScreen /> } />
            <Route path='verbs' element={ <VerbsScreen /> } />

            <Route path='mwords' element={ <MWordsScreen /> } />
            <Route path='mquotes' element={ <MQuotesScreen /> } />
            <Route path='mphrasalverbs' element={ <MPhrasalVerbsScreen /> } />
            <Route path='mverbs' element={ <MVerbs /> } />

            <Route path='config' element={ <ConfigScreen /> } />
            {/* Settings */}
            <Route path='modifywords' element={ <ModifyWordsScreen /> } />
            <Route path='modifyverbs' element={ <ModifyVerbsScreen /> } />
            <Route path='modifyphrasalverbs' element={ <ModifyPhrasalVerbsScreen /> } />
            <Route path='modifyquotes' element={ <ModifyQuotesScreen /> } />
        </Routes>
        </div>
        </div>
    )
}
