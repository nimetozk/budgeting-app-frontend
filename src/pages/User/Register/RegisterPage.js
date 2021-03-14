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

import { useFormik } from "formik";
import * as yup from "yup";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [emailError, setEmailError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      confirmPassword: "",
    },

    validationSchema: yup.object().shape({
      firstname: yup.string().required("Required"),
      lastname: yup.string().required("Required"),
      email: yup.string().required("Required").email(),
      phoneNumber: yup.string().required("Required").max(11).min(11),
      password: yup
        .string()
        .required("Required")
        .min(8, "Password must contain more then 8 characters!"),
      confirmPassword: yup
        .string()
        .required("Required")
        .when("password", {
          is: (val) => true, //(val && val.length > 0 ? true : false),
          then: yup
            .string()
            .oneOf([yup.ref("password")], "Both password need to be the same"),
        }),
    }),

    enableReinitialize: true,
    onSubmit: async (values) => {
      const [err, response] = await to(
        serviceProvider.register(
          values.firstname,
          values.lastname,
          values.email,
          values.password,
          values.phoneNumber
        )
      );

      if (err) {
        toast.error(errorToString(err), { position: "top-center" });

        return;
      }

      localStorage.setItem("token", response.data.token);
      history.push("/login");
    },
  });

  return (
    <div className="all-content">
      <div className="left-content">
        <div className="top-bar">
          <div className="top-bar-login">
            <Link to="/login">
              <button className="btn btn-login" type="button">
                Sign In
              </button>
            </Link>
            <label className="loginLabel">Already have an account?</label>
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
                    name="firstname"
                    value={formik.values.firstname}
                    type="text"
                    className="form-control"
                    placeholder="Your First Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.errors.firstname && formik.touched.firstname && (
                    <label style={{ color: "red" }}>
                      {formik.errors.firstname}
                    </label>
                  )}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    value={formik.values.lastname}
                    name="lastname"
                    type="text"
                    className="form-control"
                    placeholder="Your Last Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.errors.lastname && formik.touched.lastname && (
                    <label style={{ color: "red" }}>
                      {formik.errors.lastname}
                    </label>
                  )}
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    value={formik.values.email}
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Your Email Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.errors.email && formik.touched.email && (
                    <label style={{ color: "red" }}>
                      {formik.errors.email}
                    </label>
                  )}
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    value={formik.values.phoneNumber}
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    placeholder="Your Phone Number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <label style={{ color: "red" }}>
                      {formik.errors.phoneNumber}
                    </label>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    value={formik.values.password}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="********"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.errors.password && formik.touched.password && (
                    <label style={{ color: "red" }}>
                      {formik.errors.password}
                    </label>
                  )}
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="********"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <label style={{ color: "red" }}>
                        {formik.errors.confirmPassword}
                      </label>
                    )}
                </div>
                <div className="reg-button">
                  <button
                    className="btn btn-black"
                    type="button"
                    onClick={formik.handleSubmit}
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
