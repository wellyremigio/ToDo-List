//Seleção dos elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções
const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoList.classList.remove("hide");

    todoInput.value = "";
    todoInput.focus();
};

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

//Eventos
todoForm.addEventListener('submit', function(event){
    event.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue){
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) =>{
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let todoTitle;

    if(parentElement && parentElement.querySelector("h3")){
        todoTitle = parentElement.querySelector("h3").innerText;
    }


    if(targetElement.classList.contains("finish-todo")){
        parentElement.classList.toggle("done");
    }

    if(targetElement.classList.contains("remove-todo")){
        parentElement.remove();
    }

    if(targetElement.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

})

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    toggleForms();
})

editForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }
    toggleForms();
})