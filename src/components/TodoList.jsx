import TodoItem from './TodoItem';

function TodoList({ todos, onToggleTodo, onDeleteTodo, editingId, setEditingId, onUpdateTodo }) {

    return (
        <ul className='todo-list'>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleTodo={onToggleTodo}
                    onDeleteTodo={onDeleteTodo}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    onUpdateTodo={onUpdateTodo}
                />
            ))}
        </ul>
    );

}

export default TodoList;