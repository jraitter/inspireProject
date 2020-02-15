import Todo from "../models/Todo.js";
import store from "../store.js";

// @ts-ignore
const todoApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/James/todos/",
  timeout: 8000
});

class TodoService {
  getTodos() {
    console.log("Getting the Todo List");
    todoApi.get("")
      //TODO Handle this response from the server
      .then(result => {
        let myTodos = result.data.data.map(t => new Todo(t));
        store.commit("todos", myTodos);
        console.log("getTodos()", myTodos);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  addTodoAsync(todoObj) {
    todoApi.post("", todoObj)
      //TODO Handle this response from the server (hint: what data comes back, do you want this?)
      .then(result => {
        let newTodo = new Todo(result.data);
        store.commit("todos", newTodo);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  toggleTodoStatusAsync(todoId) {
    let todo = store.State.todos.find(todo => todo._id == todoId);
    //TODO Make sure that you found a todo,
    //		and if you did find one
    //		change its completed status to whatever it is not (ex: false => true or true => false)

    todoApi.put(todoId, todo);
    //TODO do you care about this data? or should you go get something else?
  }

  removeTodoAsync(todoId) {
    //TODO Work through this one on your own
    //		what is the request type
    //		once the response comes back, what do you need to insure happens?
  }
}

const todoService = new TodoService();
export default todoService;
