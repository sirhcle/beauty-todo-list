import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [texto, setTexto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    onAddTodo(texto);
    setTexto('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Añadir nueva tarea..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button type="submit">Añadir</button>
    </form>
  );
}

export default AddTodoForm;