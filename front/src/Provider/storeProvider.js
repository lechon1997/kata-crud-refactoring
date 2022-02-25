import React, { createContext, useReducer } from "react";
import storeReducer from '../Reducer/storeReducer';
const initialState = {
    todo: {
        list: [],
        item: {}
        },
    categorias: {
        list : []
    }
};

const Store = createContext(initialState)

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
  
    return(
    <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
    )
  
}

export { Store };
export default StoreProvider;