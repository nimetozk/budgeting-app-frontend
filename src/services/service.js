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

  getBankList() {
    return httpClient.get("/api/bank/list", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  insertBank(bankModel) {
    return httpClient.post("/api/bank", bankModel, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getBankById(id) {
    return httpClient.get(`/api/bank/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  insertBankAccount(bankAccountModel) {
    return httpClient.post("/api/bankaccount", bankAccountModel, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getDeleteBankAccountById(id) {
    return httpClient.delete(`/api/bankaccount/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getCurrentUser() {
    return httpClient.get("/api/user/current", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  updateUser(user) {
    return httpClient.put("/api/user", user, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getCurrentUserBankAccounts() {
    return httpClient.get("/api/bankaccount/useraccounts", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }
}

export default new Service();
