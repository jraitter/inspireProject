import QuoteService from "../services/quote-service.js";
import store from "../store.js";

//TODO Create methods for constructor, and rendering the quote to the page
//      (be sure to review the HTML as an element already was put there for you)
function _drawQuote() {
  console.log("QuoteController constructor loaded");
  let quote = store.State.quotes;
  document.getElementById("quote").innerHTML = quote.Template;
}
export default class QuoteController {
  constructor() {
    console.log("QuoteController constructor loaded");
    store.subscribe("quotes", _drawQuote)
    QuoteService.getQuoteOfDay();
  }
  getNextQuote() {
    QuoteService.getQuoteOfDay();
  }
}
