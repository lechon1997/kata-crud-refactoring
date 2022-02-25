
import React, {Fragment, useEffect, useContext} from 'react';
import {Store} from '../Provider/storeProvider';
const HOST = process.env.REACT_APP_HOST_API;
export default function Prueba({children}){

    const { dispatch } = useContext(Store);
    
    useEffect(() => {
      fetch(HOST + "/categorias")
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "update-categorias-list", list })
        })
    }, [dispatch]);
    return(
        <Fragment>
            {children}
        </Fragment>
    )
}