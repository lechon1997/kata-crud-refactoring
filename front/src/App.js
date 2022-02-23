import React from 'react';
import StoreProvider from './Provider/storeProvider';
import Form from './forms/todoForm';
import List from './components/list';

function App() {
  return <StoreProvider>
    <h3>To-Do List</h3>
    <Form />
    <List />
  </StoreProvider>
}

export default App;
