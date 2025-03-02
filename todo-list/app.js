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
    createTodoItem(todoText);
    todoInput.value = "";
  }
}

function createTodoItem(todo){
  const todoLI = document.createElement("li");
  
}
