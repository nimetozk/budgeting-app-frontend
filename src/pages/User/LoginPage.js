import React from "react";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const instance = axios.create({ baseURL: "https://localhost:4000" });
    const response = await instance.post("/api/auth/signin", {
      email: email,
      password: password,
    });

    console.log("response :", response.data);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  console.log("email", email);
  return (
    <div className="all-content">
      <div className="sideNav">
        <div className="sideText"></div>
      </div>

      <div className="right-content">
        <div className="top-bar">
          <label class="createAccountLabel">Don't have an account? </label>
          <button type="submit" class="btn btn-reg">
            Register
          </button>
        </div>

        <div className="main">
          <form>
            <div className="main-title">
              <h1>Welsome to East Budget!</h1>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                value={email}
                type="text"
                class="form-control"
                placeholder="Email Address"
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                type="password"
                class="form-control"
                placeholder="Password"
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="login-button">
              <button class="btn btn-black" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <LoginPage email={email} password={password}></LoginPage> */}
    </div>
  );
};

export default LoginPage;
