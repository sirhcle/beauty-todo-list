import { useState, useEffect } from 'react';
import './App.css'
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

function App() {

  const estadoInicial = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(estadoInicial);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (texto) => {
    const nuevaTarea = {
      id: Date.now(),
      texto: texto,
      completada: false,
    };
    setTodos([...todos, nuevaTarea]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completada: !todo.completada } : todo
    ));
  };

  const deleteTodo = (id) => {
    // Crea un nuevo array excluyendo la tarea con el id a eliminar
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Mi Lista de Tareas</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App
