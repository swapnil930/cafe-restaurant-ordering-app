import axios from "axios";

export class api {
  static serverURL = 'https://cafe-restaurant-ordering-app.onrender.com';

  static getAllMenu() {
    let dataURL = `${this.serverURL}/menu`; 
    return axios.get(dataURL);
  }

  static getAllCategory() {
    let dataURL = `${this.serverURL}/categories`; 
    return axios.get(dataURL);
  }
 
}