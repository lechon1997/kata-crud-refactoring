package co.com.sofka.crud.controllers;

import co.com.sofka.crud.DT.DTTodo;
import co.com.sofka.crud.models.Categoria;
import co.com.sofka.crud.services.CategoriaService;
import co.com.sofka.crud.services.TodoService;
import co.com.sofka.crud.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping(value = "api/todos")
    public Iterable<Todo> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public ResponseEntity<DTTodo> save(@RequestBody DTTodo dtTodo){

        if(dtTodo.getName().isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Long idCategoria = dtTodo.getId_categoria();
        Optional<Categoria> optionalCategoria = categoriaService.obtenerCategoria(idCategoria);
        if(optionalCategoria.isPresent()){
            Categoria categoria = (Categoria) optionalCategoria.get();

            Todo t = new Todo(dtTodo.getName(),false);
            service.save(t);

            categoria.getTodo().add(t);
            categoriaService.save(categoria);

            DTTodo dtTodoResponse = new DTTodo(t.getId(),t.getName(), categoria.getId());

            return new ResponseEntity<>(dtTodoResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "api/todo")
    public ResponseEntity<DTTodo> update(@RequestBody DTTodo dtTodo){
        try{
            Long idTodo = dtTodo.getId();
            Todo todo =  service.get(idTodo);
            todo.setName(dtTodo.getName());
            todo.setCompleted(dtTodo.isCompleted());
            service.save(todo);
            DTTodo dtTodoResponse = new DTTodo(todo.getId(),todo.getName(),todo.isCompleted(),dtTodo.getId_categoria());
            return new ResponseEntity<DTTodo>(dtTodoResponse,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "api/todo")
    public ResponseEntity<DTTodo> delete(@RequestBody DTTodo dtTodo){
        Long idTodo = dtTodo.getId();
        Long idCategoria = dtTodo.getId_categoria();
        Optional<Categoria> optionalCategoria = categoriaService.obtenerCategoria(idCategoria);
        if(optionalCategoria.isPresent()){
            Categoria c = optionalCategoria.get();
            List listaTodo = c.getTodo();
            Todo t = service.get(idTodo);
            listaTodo.remove(t);
            categoriaService.save(c);
            service.delete(idTodo);
            return new ResponseEntity<DTTodo>(dtTodo,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "api/{id}/todo")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
