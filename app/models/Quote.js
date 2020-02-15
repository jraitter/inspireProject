export default class Quote {
  constructor(data) {
    this.author = data.author;
    this.body = data.body;
  }
  get Template() {
    return `<h6>Author: ${this.author}</h6>
    <p> Quote: ${ this.body}</p>
    `
  }
}