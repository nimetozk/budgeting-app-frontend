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
import { useFormik } from "formik";
import * as yup from "yup";

const LoginPage = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object().shape({
      email: yup.string().required("Required").email(),
      password: yup.string().required("Required"),
    }),

    enableReinitialize: true,
    onSubmit: async (values) => {
      let [err, response] = await to(
        serviceProvider.signin(values.email, values.password)
      );
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
    },
  });

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
            <label className="createAccountLabel">
              Don't have an account?{" "}
            </label>
            <Link to="/register">
              <button className="btn btn-reg" type="button">
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
              <label for="email">Email Address</label>
              <input
                name="email"
                value={formik.values.email}
                type="text"
                className="form-control"
                placeholder="Your Email Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.errors.email && formik.touched.email && (
                <label style={{ color: "red" }}>{formik.errors.email}</label>
              )}
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                className="form-control"
                placeholder="********"
                onChange={formik.handleChange}
              ></input>
              {formik.errors.password && formik.touched.password && (
                <label style={{ color: "red" }}>{formik.errors.password}</label>
              )}
            </div>
            <div className="login-button">
              <button
                className="btn btn-black"
                type="button"
                onClick={formik.handleSubmit}
              >
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
