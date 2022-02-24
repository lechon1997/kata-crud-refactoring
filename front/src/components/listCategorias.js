import React, {useState} from 'react'
import styles from '../styles/ListCategorias.module.css'
import { Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter } from "reactstrap";
export default function ListCategorias(){
    const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false);
    
    const crearCategoria = e =>{
        e.preventDefault();
        
        const nombre = e.target.nombre.value
        console.log(nombre);
    }

    const mostrarModalNuevaCategoria = () => {
        setModalNuevaCategoria(true);
    }

    const ocultarModalNuevaCategoria = () => {
        setModalNuevaCategoria(false);
    }
    
    return(
        <Container>
            <Button onClick={mostrarModalNuevaCategoria} color="success">Crear categoría</Button>
            <div>
            
                <Table className="w-75 container">
                    <thead>
                        <tr>
                            <th className='w-75'>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ejercicio</td>
                            <td>
                                <Button color="primary" className='me-2'>Editar</Button>
                                <Button color="danger">Eliminar</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Estudio</td>
                            <td>
                                <Button color="primary" className='me-2'>Editar</Button>
                                <Button color="danger">Eliminar</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <Modal isOpen={modalNuevaCategoria}>
          <ModalHeader>
           <div><h3>Ingresar categoría</h3></div>
          </ModalHeader>
            <form onSubmit={crearCategoria}>
          <ModalBody>
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                
              />
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              
            >
              Confirmar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={ocultarModalNuevaCategoria}
            >
              Cancelar
            </Button>
          </ModalFooter>
          </form>
        </Modal>

        </Container>
    )
}