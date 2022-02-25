import React,{useContext,useEffect, useState} from 'react';
import {Store} from '../Provider/storeProvider';
import { Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter } from "reactstrap";

const HOST = process.env.REACT_APP_HOST_API;

function getListaToDo(listC){
  var lista = [];
  for (let i = 0; i < listC.length;i++){
    for(let j = 0; j < listC[i].todo.length;j++){
      lista.push({id: listC[i].todo[j].id,name:listC[i].todo[j].name,completed:listC[i].todo[j].completed,name_c: listC[i].name});
    }
  }
  return lista
}

const List = () => {
    
    const [modalToDo, setModalToDO] = useState(false);
    const { dispatch, state: { categorias } } = useContext(Store);
    const currentList = categorias.list;
    const listTodo = getListaToDo(currentList);


    const crearToDo = (event) => {
      event.preventDefault();
  
      const request = {
        name: event.target.nombre.value,
        id_categoria:event.target.categoria.value
      };
      
      fetch(HOST + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          ocultarModalToDo();
        });
        
    }

    const onDelete = (id) => {
        fetch(HOST + "/" + id + "/todo", {
        method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };
  
    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };
  
    const onChange = (event, todo) => {
      const request = {
        name: todo.name,
        id: todo.id,
        completed: event.target.checked
      };
      fetch(HOST + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
        });
    };

    const mostrarModalToDo = () =>{
      setModalToDO(true);
    }

    const ocultarModalToDo = () =>{
      setModalToDO(false);
    }
  
    const decorationDone = {
      textDecoration: 'line-through'
    };
    return (
      <Container className='ms-0'>
        <div className='m-3'>
          <Button onClick={mostrarModalToDo} color="success">Crear To Do</Button>
        </div>
        
        <Table className='w-75 container'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tarea</th>
              <th>¿Completado?</th>
              <th>Categoria</th>
              <th style={{display : 'flex', justifyContent : 'center'}} >Acciones</th>
            </tr>
          </thead>
          <tbody>
              {
                listTodo.map((todo)=>{
                  return <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.name}</td>
                  <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                  <td>{todo.name_c}</td>
                  <td style={{display : 'flex', justifyContent : 'flex-end'}} >
                    <Button color="primary" className='me-2' onClick={() => onEdit(todo)}>Editar</Button>
                    <Button color="danger" onClick={() => onDelete(todo.id)}>Eliminar</Button>
                  </td>
                </tr>
                })
              
              }
          </tbody>
        </Table>

        <Modal isOpen={modalToDo}>
                <ModalHeader>
                    <div><h3>Crear to do</h3></div>
                </ModalHeader>
                
                <form onSubmit={crearToDo}>
                    <ModalBody>
                        <FormGroup>
                          <select defaultValue="" name="categoria" className="form-select" aria-label="Default select example">
                            <option value="0" >Seleccione una categoría...</option>
                            {
                              currentList.map((categoria) => {
                                return <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                              })
                            }
                          </select>
                        </FormGroup>
                        
                        <FormGroup>
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text"/>
                        </FormGroup>
            
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary">Confirmar</Button>
                        <Button className="btn btn-danger" onClick={ocultarModalToDo}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>

      </Container>
    )
  }

  export default List;

