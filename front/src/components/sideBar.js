import React from 'react';
import styles from '../styles/SideBar.module.css';

export default function SideBar({children}){

    return(
        <div className={styles.contenedor}>
            <ul>
                {children}
            </ul>
        </div>
    )
}

