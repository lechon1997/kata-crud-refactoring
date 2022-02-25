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
        Long idCategoria = dtTodo.getId_categoria();
        Optional<Categoria> optionalCategoria = categoriaService.obtenerCategoria(idCategoria);
        if(optionalCategoria.isPresent()){
            Categoria categoria = (Categoria) optionalCategoria.get();

            Todo t = new Todo(dtTodo.getName());
            service.save(t);

            categoria.getTodo().add(t);
            categoriaService.save(categoria);

            DTTodo dtTodoResponse = new DTTodo(t.getId(),t.getName(), categoria.getId());

            return new ResponseEntity<>(dtTodoResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "api/todo")
    public Todo update(@RequestBody Todo todo){
        if(todo.getId() != null){
            return service.save(todo);
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
