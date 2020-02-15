import { generateId } from "../utils.js"

export default class Todo {
  constructor(data) {
    this.description = data.description
    this.id = data.id || generateId()
    this.completed = data.completed || false;
  }
  get Template() {

    let codeVar = ""
    if (this.completed) {
      codeVar = `<input type="checkbox" name="completed" class="ml-1" onclick="app.todoController.completed('${this.id}')" id="${this.id}" checked>`
    } else {
      codeVar = `<input type="checkbox" name="completed" class="ml-1" onclick="app.todoController.completed('${this.id}')" id="${this.id}">`
    }
    return `
      <div class="row mb-1">
      <div class="col-12 d-flex align-items-center">
      <button onclick="app.todoController.removeTodo('${this.id}')" type="button" class="btn btn-danger btn-sm">X</button>`
      + codeVar +
      `<h6 class="m-0 pl-2">${this.description}</h6>
      </div>
    </div>
`
  }
}