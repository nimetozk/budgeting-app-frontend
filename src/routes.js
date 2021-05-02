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
 *
 * This part of the template has been modified to aid the needs of the application.
 *
 * I have implemented the routers by defining the page paths and components created on 'Pages' folder.
 */
import Dashboard from "pages/Dashboard/DashboardPage";
import UserProfile from "./pages/User/UserPages/UserProfile";
import TaskListPage from "pages/Task/TasksListPage";
import BankListPage from "pages/Bank/BankListPage";
import UserList from "pages/AdminUserPages/AdminUserList";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    title: "Statistics on Budgetting",
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    title: "Profile",
    layout: "/admin",
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "nc-icon nc-notes",
    component: TaskListPage,
    title: "Tasks",
    layout: "/admin",
  },
  {
    path: "/banks",
    name: "Banks",
    icon: "nc-icon nc-notes",
    component: BankListPage,
    title: "Banks",
    layout: "/admin",
  },
  {
    path: "/users",
    name: "User List",
    icon: "nc-icon nc-notes",
    component: UserList,
    title: "List of Users",
    layout: "/admin",
  },
];

export default dashboardRoutes;
