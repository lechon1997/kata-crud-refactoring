
const storeReducer = (state, action) => {
    switch (action.type) {
      case 'update-categoria':
        const categoriasUpdate = state.categorias.list;
        const newCategoriasUpdate = categoriasUpdate.map((categoria) => {
          if(categoria.id === action.item.id){
            return action.item;
          }
          return categoria;
        })
      return {...state, categorias: {list: newCategoriasUpdate}}        

      case 'delete-categoria':
        const categoriasDelete = state.categorias.list;
        const newListCategorias = categoriasDelete.filter((item) => {
            return item.id !== action.id;
          });
        return { ...state, categorias: {list: newListCategorias}}

      case 'add-categoria':
        const categoriaUp = state.categorias.list;
        categoriaUp.push(action.item);
        return { ...state, categorias: {list: categoriaUp} }
      
        case 'update-categorias-list':
        const categoriasList = state.categorias;
        categoriasList.list = action.list;
        return { ...state, categorias: categoriasList }
      
        case 'update-item':
        const categoriasUpdateTodo = state.categorias.list;
        for(const categoria of categoriasUpdateTodo){
          const categoriaUpdate = categoria.todo.map((todo) => {
            if(todo.id === action.item.id){
              return action.item
            }
            return todo;
          });
            categoria.todo = categoriaUpdate;
        }

        return {...state, categorias: {list: categoriasUpdateTodo}}
        
        case 'delete-item':
        const categoriasAux = state.categorias.list;
        for (const categoria of categoriasAux){
          const todoList = categoria.todo.filter((item) => {
            return item.id !== action.id;
          });
          categoria.todo = todoList;
        }
        
        return { ...state, categorias: {list: categoriasAux}}
      
        case 'update-list':
        const todoUpList = state.todo;
        todoUpList.list = action.list;
        return { ...state, todo: todoUpList }
      
        case 'edit-item':
        const todoUpEdit = state.todo;
        todoUpEdit.item = action.item;
        return { ...state, todo: todoUpEdit }

      case 'add-item':
        const categorias_aux = state.categorias.list;
        for(const categoria of categorias_aux){
          if(categoria.id === action.item.id_categoria){
            console.log("bien :)");
            categoria.todo.push({id:action.item.id, name: action.item.name});
            break;
            }
          }
        return { ...state, categorias: {list: categorias_aux} }
      default:
        return state;
    }
  }

  export default storeReducer;