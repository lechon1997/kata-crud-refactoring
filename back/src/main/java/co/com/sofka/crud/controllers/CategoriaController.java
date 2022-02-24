package co.com.sofka.crud.controllers;

import co.com.sofka.crud.models.Categoria;
import co.com.sofka.crud.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Categoria save(@RequestBody Categoria categoria){
        Categoria c = new Categoria(categoria.getName());
        return service.save(c);
    }



}
