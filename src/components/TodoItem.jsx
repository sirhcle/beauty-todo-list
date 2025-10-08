import TrashIcon from './TrashIcon.jsx';
function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {

    const itemClass = todo.completada ? 'todo-item completed' : 'todo-item';
    return (
        <li className={itemClass}>
            <input
                type='checkbox'
                checked={todo.completada}
                onChange={() => onToggleTodo(todo.id)}
                readOnly />
            <span>{todo.texto}</span>
            <button
                className="delete-btn"
                onClick={() => onDeleteTodo(todo.id)}
            >
                <TrashIcon />
            </button>
        </li>
    );
}

export default TodoItem;