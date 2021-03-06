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
 This part of the template has been modified to aid the needs of the application. 

 It renders the footer that displayed on each web page. 
*/

import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="/dashboard">Home</a>
              </li>
              <li>
                <a href="https://github.com/nimetozk/budgeting-app-frontend">
                  GitHub
                </a>
              </li>
            </ul>
            <p
              className="copyright text-center"
              style={{ color: "rgb(42, 169, 173)" }}
            >
              © {new Date().getFullYear()}{" "}
              <a style={{ color: "grey" }}>Nimet Ozakca</a>
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
