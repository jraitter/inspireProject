import TodoService from "../services/todo-service.js";
import store from "../store.js";

//TODO Create the render function
function _drawTodos() {
  console.log("entered _drawTodos()")
  let myTodos = store.State.todos;
  let numTodos = store.State.todos.length;
  let dataElem = document.getElementById("todos");
  let todoCountElem = document.getElementById("todo-count");
  let template = "";
  myTodos.forEach(t => {
    template += t.Template;
  })
  dataElem.innerHTML = template;
  todoCountElem.innerText = numTodos.toString();
}

export default class TodoController {
  constructor() {
    console.log("TodoController constructor loaded");
    //TODO Remember to register your subscribers
    store.subscribe("todos", _drawTodos)
    TodoService.getTodos();
  }

  addTodo(e, id) {
    console.log("addTodo(e)", e);

    e.preventDefault();
    let form = e.target;
    let todoObj = {
      //TODO build the todo object from the data that comes into this method
      description: form.description.value
    };
    TodoService.addTodoAsync(todoObj);
    form.reset();
  }

  //NOTE This method will pass an Id to your service for the TODO that will need to be toggled
  toggleTodoStatus(todoId) {
    TodoService.toggleTodoStatusAsync(todoId);
  }

  //NOTE This method will pass an Id to your service for the TODO that will need to be deleted
  removeTodo(todoId) {
    TodoService.removeTodoAsync(todoId);
  }
  completed(todoId) {
    console.log("todoId = ", todoId);
    let currElem = document.getElementById(todoId)
    console.log("the element is ", currElem.checked)
    let completed = currElem.checked;
    // could use {completed}, this would assign the key to completed and value to value of completed
    TodoService.completed(todoId, { completed: completed });
    // do not call your draw function here because this method is only passing data to the service.
  }
}
