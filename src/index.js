/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/**
 * This part of the template has been modified to aid the needs of the application.
 */
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import LoginPage from "pages/User/Login/LoginPage";
import RegisterPage from "pages/User/Register/RegisterPage";
import { ConfirmationServiceProvider } from "./components/Dialog/dialog-provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

ReactDOM.render(
  <ConfirmationServiceProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>

        <Route path="/" render={(props) => <AdminLayout {...props} />} />

        {/*
     <Redirect from="/" to="/admin/dashboard" />
     */}
      </Switch>
    </BrowserRouter>
  </ConfirmationServiceProvider>,
  document.getElementById("root")
);
