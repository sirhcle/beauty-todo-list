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
            <button className='deleted-butn' onClick={() => onDeleteTodo(todo.id)}>X</button>
        </li>
    );
}

export default TodoItem;