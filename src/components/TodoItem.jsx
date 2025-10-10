import TrashIcon from './TrashIcon.jsx';
import PencilIcon from './PencilIcon'
import { useState } from 'react';

function TodoItem({ todo, onToggleTodo, onDeleteTodo, editingId, setEditingId, onUpdateTodo }) {
  const [nuevoTexto, setNuevoTexto] = useState(todo.texto);
  
  const isEditing = editingId === todo.id;

  const handleUpdate = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (nuevoTexto.trim()) {
      onUpdateTodo(todo.id, nuevoTexto);
    }
  };

  return (
    <li className={`todo-item ${todo.completada ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            onBlur={handleUpdate} // Guarda al hacer clic fuera
            autoFocus // Pone el foco en el input al aparecer
          />
        </form>
      ) : (
        <>
          <input 
            type="checkbox" 
            checked={todo.completada}
            onChange={() => onToggleTodo(todo.id)}
          />
          <span onDoubleClick={() => setEditingId(todo.id)}>{todo.texto}</span>
          <div className="item-buttons">
            <button className="edit-btn" onClick={() => setEditingId(todo.id)}>
              <PencilIcon />
            </button>
            <button className="delete-btn" onClick={() => onDeleteTodo(todo.id)}>
              <TrashIcon />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;