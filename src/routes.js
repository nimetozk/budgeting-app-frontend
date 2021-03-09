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
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: "nc-icon nc-notes",
    component: TaskListPage,
    layout: "/admin",
  },
  {
    path: "/banks",
    name: "Banks",
    icon: "nc-icon nc-notes",
    component: BankListPage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "User List",
    icon: "nc-icon nc-notes",
    component: UserList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
