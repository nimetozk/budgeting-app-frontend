import axios from "axios";

const httpClient = axios.create({ baseURL: "http://localhost:4000" });

class Service {
  constructor() {}

  signin(email, password) {
    return httpClient.post("/api/auth/signin", { email, password });
  }

  register(firstname, lastname, email, password, phoneNumber) {
    return httpClient.post("/api/auth/signup", {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
    });
  }

  getTaskList() {
    return httpClient.get("/api/task/list", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }
}

export default new Service();
