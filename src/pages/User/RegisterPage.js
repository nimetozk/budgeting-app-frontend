import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import serviceProvider from "../../services/service";
import { to } from "await-to-js";
import registerImage from "./register.jpg";
import logo from "./logo.png";
import "./register.css";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
    localStorage.setItem("token", response.data.token);
    history.push("/dashboard");
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    event.preventDefault();
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    event.preventDefault();
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    event.preventDefault();
  };

  console.log("email", email);
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
                    type="text"
                    class="form-control"
                    placeholder="Your First Name"
                    onChange={handleFirstNameChange}
                  ></input>
                </div>{" "}
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    value={lastname}
                    type="text"
                    class="form-control"
                    placeholder="Your Last Name"
                    onChange={handleLastNameChange}
                  ></input>
                </div>{" "}
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
              </div>
              <div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    value={phoneNumber}
                    type="text"
                    class="form-control"
                    placeholder="Your Phone Number"
                    onChange={handlePhoneNumberChange}
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
