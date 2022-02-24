package co.com.sofka.crud.DT;

public class DTTodo {
    private Long id;
    private String name;
    private Long id_categoria;

    public DTTodo() {

    }

    public DTTodo(Long id, String name, Long id_categoria) {
        this.id = id;
        this.name = name;
        this.id_categoria = id_categoria;
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

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }
}
