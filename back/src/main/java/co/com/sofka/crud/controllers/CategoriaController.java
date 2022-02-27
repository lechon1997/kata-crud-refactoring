package co.com.sofka.crud.controllers;

import co.com.sofka.crud.DT.DTCategoria;
import co.com.sofka.crud.DT.DTTodo;
import co.com.sofka.crud.models.Categoria;
import co.com.sofka.crud.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping(value = "/api/categorias")
    public Iterable<Categoria> list(){
        return service.list();
    }

    @PostMapping(value = "/api/categorias")
    public ResponseEntity<DTCategoria> save(@RequestBody DTCategoria dtCategoria) {
        if(dtCategoria.getName().isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            String nombreCategoria = dtCategoria.getName();
            Categoria c = service.save(new Categoria(nombreCategoria));
            DTCategoria dtCategoriaResponse = new DTCategoria(c.getId(), c.getName(), c.getTodo());
            return new ResponseEntity<>(dtCategoriaResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(value = "/api/categorias/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id){
        if(service.deleteCategoriaById(id)){
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/api/categorias")
    public ResponseEntity<DTCategoria> update(@RequestBody DTCategoria dtCategoria){
        Long id = dtCategoria.getId();
        String name = dtCategoria.getName();
        Optional<Categoria> optionalCategoria = service.obtenerCategoria(id);
        if(optionalCategoria.isPresent()){
            Categoria c = optionalCategoria.get();
            c.setName(name);
            service.save(c);

            DTCategoria dtCategoriaResponse = new DTCategoria(c.getId(),c.getName(),c.getTodo());
            return new ResponseEntity<DTCategoria>(dtCategoriaResponse,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
