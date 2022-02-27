import React,{useContext,useEffect, useState} from 'react';
import {Store} from '../Provider/storeProvider';
import { Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter, Alert } from "reactstrap";

const HOST = process.env.REACT_APP_HOST_API;

function getListaToDo(listC){
  var lista = [];
  for (let i = 0; i < listC.length;i++){
    for(let j = 0; j < listC[i].todo.length;j++){
      lista.push({id: listC[i].todo[j].id,name:listC[i].todo[j].name,completed:listC[i].todo[j].completed,name_c: listC[i].name,id_c:listC[i].id});
    }
  }
  return lista
}

const List = () => {
    
    const [modalToDo, setModalToDo] = useState(false);
    const [toDoSelected,setToDoSelected] = useState({});
    const [alertSelect, setAlertSelect] = useState(false);
    const [alertName, setAalertName] = useState(false);
    const [modalEditarToDo, setModalEditarToDo] = useState(false)
    const { dispatch, state: { categorias } } = useContext(Store);
    const currentList = categorias.list;
    const listTodo = getListaToDo(currentList);


    const mostrarModalEditarToDo = todo =>{
      setToDoSelected(todo)
      setModalEditarToDo(true)
    }

    const ocultarModalEditarToDo = () =>{
      setToDoSelected({})
      setModalEditarToDo(false)
    }
    const crearToDo = (event) => {
      event.preventDefault();

      if(event.target.categoria.value == 0){
        setAlertSelect(true);
        return false;
      }else{
        setAlertSelect(false);
      }
      
      if(event.target.name.value.length === 0){
        setAalertName(true);
        return false;
      }else{
        setAalertName(false);
      }

      const request = {
        name: event.target.name.value,
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

    const mostrarModalToDo = () =>{
      setModalToDo(true);
    }

    const ocultarModalToDo = () =>{
      setModalToDo(false);
      setAalertName(false);
      setAlertSelect(false);
    }

    const onDelete = (id,ic_categoria) => {
      const request = {
        id: id,
        id_categoria: ic_categoria
      }

        fetch(HOST +"/todo", {
        method: "DELETE",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };
  
    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

   
   const editarToDo = (event) => {
      event.preventDefault();

      if(event.target.name.value.length === 0){
        setAalertName(true);
        return false;
      }else{
        setAalertName(false);
      }
  
      const request = {
        name: toDoSelected.name,
        id: toDoSelected.id,
        completed: toDoSelected.completed,
        id_categoria: toDoSelected.id_c
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
          ocultarModalEditarToDo();
        });
    }


    const handleChange = (e) => {
      setToDoSelected({
      ...toDoSelected,
      [e.target.name]: e.target.value,
        
      });
    };
  
    const onChange = (event, todo) => {
      const request = {
        id: todo.id,
        name: todo.name,
        completed: event.target.checked,
        id_categoria: todo.id_c
      };
      console.log(request);
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
                    <Button color="primary" className='me-2' onClick={() => mostrarModalEditarToDo(todo)}>Editar</Button>
                    <Button color="danger" onClick={() => onDelete(todo.id,todo.id_c)}>Eliminar</Button>
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
                            <input className="form-control" name="name" type="text"/>
                        </FormGroup>
                        <Alert isOpen={alertSelect} color="danger">
                          Debe seleccionar una categoría para poder continuar.   
                        </Alert>

                        <Alert isOpen={alertName} color="danger">
                          El campo nombre es obligatorio.  
                        </Alert>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary">Confirmar</Button>
                        <Button className="btn btn-danger" onClick={ocultarModalToDo}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>

            <Modal isOpen={modalEditarToDo}>
                <ModalHeader>
                    <div><h3>Editar to do</h3></div>
                </ModalHeader>
                <form onSubmit={editarToDo}>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input onChange={handleChange} className="form-control" name="name" type="text" value={toDoSelected.name}/>
                    </FormGroup>
                    <Alert isOpen={alertSelect} color="danger">
                          Debe seleccionar una categoría para poder continuar.   
                        </Alert>

                        <Alert isOpen={alertName} color="danger">
                          El campo nombre es obligatorio.  
                        </Alert>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary">Confirmar</Button>
                    <Button className="btn btn-danger" onClick={ ocultarModalEditarToDo}>
                        Cancelar
                    </Button>
                </ModalFooter>
                </form>
            </Modal>

      </Container>
    )
  }

  export default List;

