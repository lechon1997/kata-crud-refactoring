package co.com.sofka.crud.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Categoria {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 20, nullable = false, unique = true)
    private String name;

    @OneToMany
    private List<Todo> todo;

    public Categoria() {
    }

    public Categoria(String name) {
        this.name = name;
        this.todo = new ArrayList<>();
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
