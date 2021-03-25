import axios from "axios";
import { to } from "await-to-js";

const httpClient = axios.create({
  // baseURL: "https://nimet-budget-api.herokuapp.com",
  baseURL: "http://localhost:4000",
});

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

  getUserList() {
    return httpClient.get("/api/user/list", {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  insertBank(bankModel) {
    return httpClient.post("/api/bank", bankModel, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  insertUser(userModel) {
    return httpClient.post("/api/user", userModel, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getDeleteUserAccountById(id) {
    return httpClient.delete(`/api/user/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getBankById(id) {
    return httpClient.get(`/api/bank/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getUserById(id) {
    return httpClient.get(`/api/user/${id}`, {
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

  updateBank(bank) {
    return httpClient.put("/api/bank", bank, {
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
    return httpClient.put(`/api/task/${task._id}`, task, {
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

  partialTransactionUpdate(transaction, id) {
    return httpClient.patch(`/api/transaction/${id}`, transaction, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getCategoryGroupTransactions(income, bankId, startDate, endDate) {
    let query = "";

    if (startDate) {
      query += `&startDate=${startDate}`;
    }

    if (endDate) {
      query += `&endDate=${endDate}`;
    }

    if (bankId) {
      query += `&bankId=${bankId}`;
    }

    return httpClient.get(
      `/api/transaction/reportByCategory?income=${income}${query}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
  }

  getMonthGroupTransactions(year) {
    return httpClient.get(`/api/transaction/reportByMonth?year=${year}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  HasAdminRole() {
    const jsonStr = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(jsonStr);
    if (!currentUser) return false;
    return currentUser.userRoles.includes("ADMIN");
  }

  IsAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) return false;

    return true;
  }

  getTransactionByIId(transactionId) {
    return httpClient.get(`/api/transaction/${"transactionId"}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  getPlaceLabels() {
    return httpClient.get(`/api/placeLabel`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  savePlaceLabel(placelabel) {
    return httpClient.post(`/api/placeLabel`, placelabel, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }

  deletePlaceLabel(placeLabel) {
    return httpClient.delete(`/api/placeLabel/${placeLabel}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }
}

export default new Service();
