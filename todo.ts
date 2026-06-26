const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
   
let todos: string[] = [];

function loadTodos(): void {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

function saveTodos(): void {
    localStorage.setItem("todos", JSON.stringify(todos));
}


function renderTodos(): void {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="task-text">${todo}</span>
            <button class="delete-btn">🗑</button>
        `;

        const deleteBtn = li.querySelector(
            ".delete-btn"
        ) as HTMLButtonElement;

        deleteBtn.addEventListener("click", () => {
            deleteTodo(index);  
        });

        todoList.appendChild(li);
    });
}
function addTodo(): void {
    const task = todoInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    todos.push(task);

    saveTodos();
    renderTodos();

    todoInput.value = "";
    todoInput.focus();
}


function deleteTodo(index: number): void {
    todos.splice(index, 1);

    saveTodos();
    renderTodos();
}

addBtn.addEventListener("click", addTodo);


todoInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addTodo();
    }
});


loadTodos();
