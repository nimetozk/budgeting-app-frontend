import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import serviceProvider from "../../../services/service";
import { to } from "await-to-js";
import loginImage from "./login.jpg";
import logo from "./logo.png";
import "./login.css";
import { toast } from "react-toastify";
import { errorToString } from "utility";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    let [err, response] = await to(serviceProvider.signin(email, password));
    if (err) {
      toast.error(errorToString(err), { position: "top-center" });

      return;
    }
    localStorage.setItem("token", response.data.token);

    [err, response] = await to(serviceProvider.getCurrentUser());
    if (err) {
      toast.error(errorToString(err), { position: "top-center" });

      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...response.data, password: "" })
    );

    history.push("/dashboard");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };

  console.log("email", email);
  return (
    <div className="all-content">
      <div className="sideNav">
        <div className="sideText">
          <img
            className="loginImage"
            src={loginImage}
            alt="this is the login image"
          />
        </div>
      </div>

      <div className="right-content">
        <div className="top-bar">
          <div className="top-bar-logo">
            <img className="logo" src={logo} alt="this is the login image" />
          </div>
          <div className="top-bar-reg">
            <label class="createAccountLabel">Don't have an account? </label>
            <Link to="/register">
              <button class="btn btn-reg" type="button">
                Register
              </button>
            </Link>
          </div>
        </div>

        <div className="main">
          <form>
            <div className="main-title">
              <h1>Welcome to Easy Money!</h1>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                value={email}
                type="text"
                class="form-control"
                placeholder="Your Email Address"
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                value={password}
                type="password"
                class="form-control"
                placeholder="********"
                onChange={handlePasswordChange}
              ></input>
            </div>
            <div className="login-button">
              <button class="btn btn-black" type="button" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
