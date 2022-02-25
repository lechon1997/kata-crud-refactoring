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

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping(value = "/api/categorias")
    public Iterable<Categoria> list(){
        Iterable it = service.list();
        Iterator itC = it.iterator();

        while(itC.hasNext()){

        }
        return service.list();
    }

    @PostMapping(value = "/api/categorias")
    public ResponseEntity<DTCategoria> save(@RequestBody DTCategoria dtCategoria) {
        try {
            String nombreCategoria = dtCategoria.getName();
            Categoria c = service.save(new Categoria(nombreCategoria));
            DTCategoria dtCategoriaResponse = new DTCategoria(c.getId(), c.getName());
            return new ResponseEntity<>(dtCategoriaResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
