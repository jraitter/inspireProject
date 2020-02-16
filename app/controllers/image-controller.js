import ImageService from "../services/image-service.js";
import store from "../store.js";

//TODO Create methods for constructor, and rendering the image to the page
//      (you may wish to set it as a background image)
//Private
function _drawBGImage() {
  let bgImage = store.State.images;
  document.querySelector("body").style.backgroundImage = `url(${bgImage.url})`;
}

export default class ImageController {
  constructor() {
    console.log("ImageController constructore loaded");
    store.subscribe("images", _drawBGImage)
    ImageService.getImage();
  }
  getNextImage() {
    ImageService.getImage();
  }
}
