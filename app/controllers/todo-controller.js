import TodoService from "../services/todo-service.js";
import store from "../store.js";

//TODO Create the render function
function _drawTodos() {
  console.log("entered _drawTodos()")
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
  }

  //NOTE This method will pass an Id to your service for the TODO that will need to be toggled
  toggleTodoStatus(todoId) {
    TodoService.toggleTodoStatusAsync(todoId);
  }

  //NOTE This method will pass an Id to your service for the TODO that will need to be deleted
  removeTodo(todoId) {
    TodoService.removeTodoAsync(todoId);
  }
}
