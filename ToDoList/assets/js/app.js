document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('btn');
    const todoList = document.getElementById('todoList');
    const errorMessage = document.getElementById('error-message');

    addTodoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteTodo);
    loadTodos();

    function addTodo() {
        const todoText = todoInput.value;
        
        if (todoText === "") {
            errorMessage.style.display = 'block';
            return;
        }
        
        errorMessage.style.display = 'none';
        
        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.className = 'delete-button';
        
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
        
        saveTodoToLocalStorage(todoText);
        todoInput.value = '';
    }

    function deleteTodo(e) {
        if (e.target.classList.contains('delete-button')) {
            const todoItem = e.target.parentElement;
            todoList.removeChild(todoItem);
            removeTodoFromLocalStorage(todoItem.textContent.slice(0, -3));
        }
    }

    function saveTodoToLocalStorage(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.textContent = todo;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Sil';
            deleteButton.className = 'delete-button';
            
            todoItem.append(deleteButton);
            todoList.append(todoItem);
        });
    }

    function removeTodoFromLocalStorage(todo) {
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos = todos.filter(item => item !== todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
