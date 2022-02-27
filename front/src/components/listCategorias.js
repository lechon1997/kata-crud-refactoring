import React,{useContext, useState} from 'react';
import {Store} from '../Provider/storeProvider';
import { Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter } from "reactstrap";

const HOST = process.env.REACT_APP_HOST_API;

export default function ListCategorias(){

    const { dispatch, state: { categorias } } = useContext(Store);
    const currentList = categorias.list;
    
    const [modalNuevaCategoria, setModalNuevaCategoria] = useState(false);
    const [modalEditarCategoria, setModalEditarCategoria] = useState(false);
    const [categoriaSelected, setCategoriaSelected] = useState({});
    
    const handleChange = (e) => {
        setCategoriaSelected({
        ...categoriaSelected,
        [e.target.name]: e.target.value,
          
        });
      };

    const editarCategoria = (e) =>{
        e.preventDefault();
        const request = {
            id: categoriaSelected.id,
            name: categoriaSelected.name,
            todo: null
        }

        fetch(HOST + "/categorias", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then((categoria) => {
              dispatch({ type: "update-categoria", item: categoria });
              setModalEditarCategoria(false);
              setCategoriaSelected({})
            });
    }

    const crearCategoria = e =>{
        e.preventDefault();
        
        const request = {
            name: e.target.name.value
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

    const eliminarCategoria = (id) => {

        fetch(HOST +"/categorias/" + id, {
        method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-categoria", id })
        })
        
    }

    const mostrarModalNuevaCategoria = () => {
        setModalNuevaCategoria(true);
    }

    const ocultarModalNuevaCategoria = () => {
        setModalNuevaCategoria(false);
    }

    const mostrarModalEditarCategoria = categoria => {
        setCategoriaSelected(categoria);
        setModalEditarCategoria(true);
    }

    const ocultarModalEditarCategoria = () => {
        setModalEditarCategoria(false);
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
                                        <Button onClick={() => {mostrarModalEditarCategoria(categoria)}} color="primary" className='me-2'>Editar</Button>
                                        <Button onClick={() => {eliminarCategoria(categoria.id)}} color="danger">Eliminar</Button>
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
                            <input className="form-control" name="name" type="text"/>
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

            <Modal isOpen={modalEditarCategoria}>
                <ModalHeader>
                    <div><h3>Editar categoría</h3></div>
                </ModalHeader>
                <form onSubmit={editarCategoria}>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input onChange={handleChange} className="form-control" name="name" type="text" value={categoriaSelected.name}/>
                    </FormGroup>
        
                </ModalBody>

                <ModalFooter>
                    <Button color="primary">Confirmar</Button>
                    <Button className="btn btn-danger" onClick={ocultarModalEditarCategoria}>
                        Cancelar
                    </Button>
                </ModalFooter>
                </form>
            </Modal>
        </Container>
    )
}