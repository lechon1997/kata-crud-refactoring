import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import StoreProvider from './Provider/storeProvider';
import SideBar from './components/sideBar';
import List from './components/list';
import ListCategorias from './components/listCategorias';
import styles from './styles/App.module.css'
import Prueba from './components/prueba';

function App() {

  
  return (
  <StoreProvider>
    <Prueba>
      <div className={styles.contenedor}>
        <Router>
            <SideBar>
                <li><Link to="/categorias">Categorías</Link></li>
                <li><Link to="/todo">To Do</Link></li>
            </SideBar>
            <Routes>
                <Route path="/todo" element={<List/>}/>
                <Route path="/categorias" element={<ListCategorias/>}/>
            </Routes>
        </Router>
      </div>
    </Prueba>
  </StoreProvider>
  )
}

export default App;
