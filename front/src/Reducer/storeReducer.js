
const storeReducer = (state, action) => {
    switch (action.type) {

      case 'add-categoria':
        const categoriaUp = state.categorias.list;
        categoriaUp.push(action.item);
        return { ...state, categorias: {list: categoriaUp} }
      
        case 'update-categorias-list':
        const categoriasList = state.categorias;
        categoriasList.list = action.list;
        return { ...state, categorias: categoriasList }
      
        case 'update-item':
        const todoUpItem = state.todo;
        const listUpdateEdit = todoUpItem.list.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        });
        todoUpItem.list = listUpdateEdit;
        todoUpItem.item = {};
        return { ...state, todo: todoUpItem }
      
        case 'delete-item':
        const todoUpDelete = state.todo;
        const listUpdate = todoUpDelete.list.filter((item) => {
          return item.id !== action.id;
        });
        todoUpDelete.list = listUpdate;
        return { ...state, todo: todoUpDelete }
      
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