import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import serviceProvider from "../../../services/service";

import { to } from "await-to-js";
import registerImage from "./register.jpg";
import logo from "./logo.png";
import "./register.css";
import validator from "validator";

import { toast } from "react-toastify";
import { errorToString } from "utility";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [emailError, setEmailError] = useState("");

  const handleRegister = async () => {
    const [err, response] = await to(
      serviceProvider.register(
        firstname,
        lastname,
        email,
        password,
        phoneNumber
      )
    );

    if (err) {
      toast.error(errorToString(err), { position: "top-center" });

      return;
    }

    localStorage.setItem("token", response.data.token);
    history.push("/login");
  };

  const handleEmailOnBlur = (event) => {
    const ok = validator.isEmail(event.target.value);
    if (!ok) setEmailError("Email is invalid !");
    else setEmailError("");
  };

  const handleTextChange = (event) => {
    switch (event.target.name) {
      case "password":
        setPassword(event.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "lastname":
        setLastName(event.target.value);
        break;
      case "firstname":
        setFirstName(event.target.value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="all-content">
      <div className="left-content">
        <div className="top-bar">
          <div className="top-bar-login">
            <Link to="/login">
              <button class="btn btn-login" type="button">
                Sign In
              </button>
            </Link>
            <label class="loginLabel">Already have an account?</label>
          </div>

          <div className="top-bar-logo">
            <img className="logo" src={logo} alt="this is the register image" />
          </div>
        </div>

        <div className="main">
          <form>
            <div className="main-title">
              <h1>Welcome to Easy Money!</h1>
            </div>
            <div className="register-form">
              <div>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    value={firstname}
                    name="firstname"
                    type="text"
                    class="form-control"
                    placeholder="Your First Name"
                    onChange={handleTextChange}
                  ></input>
                </div>{" "}
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    value={lastname}
                    name="lastname"
                    type="text"
                    class="form-control"
                    placeholder="Your Last Name"
                    onChange={handleTextChange}
                  ></input>
                </div>{" "}
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    value={email}
                    name="email"
                    type="text"
                    class="form-control"
                    placeholder="Your Email Address"
                    onChange={handleTextChange}
                    onBlur={handleEmailOnBlur}
                  ></input>
                  {emailError && (
                    <label style={{ color: "red" }}>{emailError}</label>
                  )}
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    value={phoneNumber}
                    name="phoneNumber"
                    type="text"
                    class="form-control"
                    placeholder="Your Phone Number"
                    onChange={handleTextChange}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={password}
                    name="password"
                    type="password"
                    class="form-control"
                    placeholder="********"
                    onChange={handleTextChange}
                  ></input>
                </div>
                <div className="reg-button">
                  <button
                    class="btn btn-black"
                    type="button"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="sideNav">
        <div className="sideText">
          <img
            className="registerImage"
            src={registerImage}
            alt="this is the login image"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
