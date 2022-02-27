package co.com.sofka.crud.DT;

import co.com.sofka.crud.models.Todo;

import java.util.ArrayList;
import java.util.List;

public class DTCategoria {
    private Long id;
    private String name;
    private List<Todo> todo;

    public DTCategoria() {
    }

    public DTCategoria(Long id,String name, List todo) {
        this.id = id;
        this.name = name;
        this.todo = todo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Todo> getTodo() {
        return todo;
    }

    public void setTodo(List<Todo> todo) {
        this.todo = todo;
    }
}
