import Quote from "../models/Quote.js";
import store from "../store.js";

// @ts-ignore
const _quoteApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/quotes",
  timeout: 3000
});

//TODO create methods to retrieve data trigger the update window when it is complete
class QuoteService {
  constructor() {
    console.log("QuoteService constructor loaded");
  }
  getQuoteOfDay() {
    _quoteApi
      .get("")
      .then(result => {
        let newQuote = new Quote(result.data.quote);
        store.commit("quotes", newQuote);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

const quoteService = new QuoteService();
export default quoteService;
