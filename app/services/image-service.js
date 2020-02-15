import Image from "../models/Image.js"
import store from "../store.js";

// @ts-ignore
const imgApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/images",
  timeout: 8000
});

//TODO create methods to retrieve data trigger the update window when it is complete
class ImageService {
  constructor() {
    console.log("ImageService constructor loaded");
  }
  getImage() {
    imgApi
      .get("")
      .then(result => {
        let image = new Image(result.data);
        store.commit("images", image);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
}

const imageService = new ImageService();
export default imageService;
