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
import React from "react";
import { useLocation, Switch, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import TaskPage from "../pages/Task/TaskPage";

import BankPage from "../pages/Bank/BankPage";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import AdminUserPage from "pages/AdminUserPages/AdminAddUser";
import PrivateRoute from "components/PrivateRoute";

function Admin(props) {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <PrivateRoute exact path={prop.path} key={key}>
            <prop.component {...props} />
          </PrivateRoute>
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  if (location.pathname === "/") {
    //  return <Redirect from="/" to="/dashboard" />;
    window.location.href = "/dashboard";
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              {getRoutes(routes)}
              <PrivateRoute exact path="/tasks/formStatus/:formStatus/id/:id">
                <TaskPage></TaskPage>
              </PrivateRoute>
              <PrivateRoute exact path="/banks/formStatus/:formStatus/id/:id">
                <BankPage></BankPage>
              </PrivateRoute>
              <PrivateRoute exact path="/users/formStatus/:formStatus/id/:id">
                <AdminUserPage></AdminUserPage>
              </PrivateRoute>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default Admin;
