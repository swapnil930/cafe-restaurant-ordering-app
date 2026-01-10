
  import axios from "axios";

export class api {
  static serverURL = 'http://localhost:8080';

  static getAllMenu() {
    let dataURL = `${this.serverURL}/menu`; 
    return axios.get(dataURL);
  }

  static getAllCategory() {
    let dataURL = `${this.serverURL}/categories`; 
    return axios.get(dataURL);
  }
  static updateContact(contactId, contact) {
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
}


  static deleteContact(contactId){
    let dataURL=`${this.serverURL}/contacts/${contactId}`;
    return axios.delete(dataURL)
  }
}
 