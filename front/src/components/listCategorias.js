import React,{useContext, useState} from 'react';
import {Store} from '../Provider/storeProvider';
import { Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter } from "reactstrap";

const HOST = process.env.REACT_APP_HOST_API;

export default function ListCategorias(){

    const { dispatch, state: { categorias } } = useContext(Store);
    const currentList = categorias.list;
    
    const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false);
    
    const crearCategoria = e =>{
        e.preventDefault();
        
        const request = {
            name: e.target.nombre.value
        };
      
      
        fetch(HOST + "/categorias", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
              'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((categoria) => {
              dispatch({ type: "add-categoria", item: categoria });
              ocultarModalNuevaCategoria();
            });

    }

    const mostrarModalNuevaCategoria = () => {
        setModalNuevaCategoria(true);
    }

    const ocultarModalNuevaCategoria = () => {
        setModalNuevaCategoria(false);
    }
    
    return(
        <Container className='ms-0'>
            <div className='m-3'>
                <Button onClick={mostrarModalNuevaCategoria} color="success">Crear categoría</Button>
            </div>
            
            <div>
            
                <Table className="w-75 container">
                    <thead>
                        <tr>
                            <th className='w-75'>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentList.map((categoria) => {
                                return <tr key={categoria.id}>
                                    <td>{categoria.name}</td>
                                    <td>
                                        <Button color="primary" className='me-2'>Editar</Button>
                                        <Button color="danger">Eliminar</Button>
                                    </td>                
                                </tr>
                            })
                        }
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
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text"/>
                        </FormGroup>
            
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary">Confirmar</Button>
                        <Button className="btn btn-danger" onClick={ocultarModalNuevaCategoria}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>

        </Container>
    )
}