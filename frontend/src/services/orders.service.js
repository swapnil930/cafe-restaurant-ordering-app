
  import axios from "axios";

export class OrderServices {
  static serverURL = 'https://cafe-restaurant-ordering-app.onrender.com';

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
 