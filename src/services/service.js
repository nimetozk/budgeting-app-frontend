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
    return httpClient.get("/api/task", {
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

  getCurrentUserBankAccountsByBank(bankId) {
    return httpClient.get(
      `/api/bankaccount/getcurrentuserbankaccounts/${bankId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  }

  insertTask(task) {
    return httpClient.post(`/api/task`, task, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  updateTask(task) {
    return httpClient.put(`/api/task`, task, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getTaskById(taskId) {
    return httpClient.get(`/api/task/${taskId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getTransactionsByTaskId(taskId) {
    return httpClient.get(`/api/transaction/task/${taskId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getCategoryList() {
    return httpClient.get("/api/category/list", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  partialTransactionUpdate(refCategory, id) {
    return httpClient.patch(`/api/transaction/${id}`, refCategory, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getCategoryGroupTransactions(income, bankId, startDate, endDate) {}
}

export default new Service();
