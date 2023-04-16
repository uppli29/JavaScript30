const todoWrapperList = document.querySelector(".list-group")
const todoList = []

window.onload = () => {
    let savedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (!savedTodos) return;
    todoList.push(...savedTodos)
    todoList.map(appendTodoElement)
}

document.getElementById("addTodo").addEventListener("click", () => {
    let todoText = document.getElementById("todoName").value;
    if (!todoText) return;
    createTodo(todoText)
});

function toggleTodo(e) {
    const matchedTodo = todoList.find(todo => todo['text'] === e.target.textContent)
    if (!matchedTodo) return;
    matchedTodo.isCompleted = !matchedTodo.isCompleted
    this.classList.toggle("completed")
    this.classList.toggle("bg-success")
    saveToLocalStorage()
}

function createTodo(todoText) {
    const newTodo = { text: todoText, isCompleted: false }
    todoList.push(newTodo)
    appendTodoElement(newTodo)
    saveToLocalStorage()
}

function appendTodoElement(todoItem) {
    const li = document.createElement("li")
    li.classList.add("list-group-item")
    li.innerHTML = todoItem.text
    if (todoItem.isCompleted) {
        li.classList.add("completed")
        li.classList.add("bg-success")
    }
    li.addEventListener("click", toggleTodo)
    todoWrapperList.appendChild(li)
}

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList))
}

