import { useState, useEffect } from 'react';
import './App.css'
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import EmptyState from './components/EmptyState';
import TodoFilter from './components/TodoFilter'; // <-- Importa el nuevo componente

function App() {

  const [theme, setTheme] = useState('vibrant');
  const estadoInicial = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(estadoInicial);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1S11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.02-0.39-1.41,0 s-0.39,1.02,0,1.41l1.06,1.06c0.39,0.39,1.02,0.39,1.41,0s0.39-1.02,0-1.41L5.99,4.58z M18.36,17.3c-0.39-0.39-1.02-0.39-1.41,0 c-0.39,0.39-0.39,1.02,0,1.41l1.06,1.06c0.39,0.39,1.02,0.39,1.41,0s0.39-1.02,0-1.41L18.36,17.3z M17.3,5.99 c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.02,0,1.41s1.02,0.39,1.41,0L17.3,5.99z M7.05,18.36 c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.02,0,1.41s1.02,0.39,1.41,0L7.05,18.36z" /></svg>
  );

  const MoonIcon = () => (
    <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M8.09 1.382a.75.75 0 01-.05.814 4.121 4.121 0 005.764 5.764.75.75 0 011.193.672 7.014 7.014 0 11-7.63-7.629.75.75 0 01.723.379zm-2.06 1.46a5.513 5.513 0 107.128 7.128A5.621 5.621 0 016.03 2.843z" /></svg>
  );

  // Función para cambiar el tema
  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'vibrant';
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

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
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, nuevoTexto) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, texto: nuevoTexto } : todo
    ));
    setEditingId(null); // Salimos del modo edición
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completada;
    }
    if (filter === 'completed') {
      return todo.completada;
    }
    return true;
  });


  return (
    <div className="app" >
      <div className="theme-selector">
        <div className="theme-switch-wrapper">
          <SunIcon />
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            <span className="slider"></span>
          </label>
          <MoonIcon />
        </div>
      </div>

      <h1>Mi Lista de Tareas</h1>
      <AddTodoForm onAddTodo={addTodo} />

      <TodoFilter filter={filter} setFilter={setFilter} />

      {filteredTodos.length === 0
        ? (
          <EmptyState />)
        : (
          <TodoList
            todos={filteredTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            editingId={editingId}
            setEditingId={setEditingId}
            onUpdateTodo={updateTodo}
          />
        )}
    </div>

  );
}

export default App
