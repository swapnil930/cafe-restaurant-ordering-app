
  import axios from "axios";

export class OrderServices {
  static serverURL = 'http://localhost:8080';

  static getAllOrders() {
    let dataURL = `${this.serverURL}/order`; 
    return axios.get(dataURL);
  }

static createOrder(order) {
  let dataURL = `${this.serverURL}/order`;
  const payload = {
    ...order,                
    status: "pending",
    createdAt: new Date().toISOString()
  };

  return axios.post(dataURL, payload);
}

}
 