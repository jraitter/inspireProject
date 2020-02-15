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
        let newTodo = new Todo(result.data.data);
        let allTodos = [...store.State.todos, newTodo]
        store.commit("todos", allTodos);
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
    console.log("removeTodoAsync()", todoId);
    todoApi
      .delete(todoId)
      .then(result => {
        let filteredTodos = store.State.todos.filter(t => t._id != todoId);
        store.commit("todos", filteredTodos);
      })
      .catch(err => {
        throw new Error(err);
      });

    //TODO Work through this one on your own
    //		what is the request type
    //		once the response comes back, what do you need to insure happens?
  }

  completed(todoId, completed) {
    // in this case completed is an object = { completed: completed }
    todoApi
      .put(todoId, completed)
      .then(result => {
        let currTodo = store.State.todos.find(c => c._id == todoId);
        // loop thru properties of this todo and update property with new value
        for (let prop in completed) {
          currTodo[prop] = completed[prop];
        }
      })
      .catch(err => {
        throw new Error(err);
      })
  }
}

const todoService = new TodoService();
export default todoService;
