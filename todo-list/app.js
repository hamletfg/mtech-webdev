/* select html elements */
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

/* array to store todos */
let allTodos = [];

/* event listener to grab inputed text in form */
todoForm.addEventListener('submit', function(e){
  e.preventDefault();
  addTodo();
})

/* function to read text from input field and add to array */
function addTodo(){
  const todoText = todoInput.value.trim();
  if(todoText.length > 0){  /* code will be only executed if a user enters text */
    allTodos.push(todoText);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList(){
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoLI);
  })
}

function createTodoItem(todo, todoIndex){
  const todoId = "todo-"+todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "todo";
  todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
          </svg>
        </label>
        <label for="${todoId}" class="todo-text">
          ${todo}
        </label>
        <button class="delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
        </button>
  `
  return todoLI;
}

/* save todos to local storage */
function saveTodos(){
  const todoJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}
saveTodos();
