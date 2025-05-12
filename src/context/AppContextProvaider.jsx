import React, { useContext, createContext, useReducer } from 'react'
import { initialState, reducer } from './reducer';

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const appContext = useContext(AppContext);

    if (appContext) {
        return appContext;
    }   
    throw new Error('useAppContext must be used within an AppContextProvider');
};

export default AppContextProvider;