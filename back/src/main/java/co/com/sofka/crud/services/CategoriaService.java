package co.com.sofka.crud.services;

import co.com.sofka.crud.models.Categoria;
import co.com.sofka.crud.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository repository;

    public Iterable<Categoria> list(){
        return repository.findAll();
    }

    public Categoria save(Categoria categoria){
        return repository.save(categoria);
    }

    public Optional<Categoria> obtenerCategoria(Long id){
        return repository.findById(id);
    }

    public boolean deleteCategoriaById(Long id){
        try {
            repository.deleteById(id);
            return true;
        }catch(Exception e){
            return false;
        }

    }
}
