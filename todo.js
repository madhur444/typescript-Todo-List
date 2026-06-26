"use strict";
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let todos = [];

function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${todo}</span>
            <button class="delete-btn">🗑</button>
        `;
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            deleteTodo(index);
        });
        todoList.appendChild(li);
    });
}

function addTodo() {
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

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

loadTodos();
