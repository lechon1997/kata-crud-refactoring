import React, {useState} from 'react';
import styles from '../styles/SideBar.module.css';

export default function SideBar({children}){
    const [categoria,setCategoria] = useState(true)
    const [todo,setTodo] = useState(true)

    return(
        <div className={styles.contenedor}>
            <ul>
                {children}
            </ul>
        </div>
    )
}

