import react from "react";
import { Redirect, Route } from "react-router-dom";
import service from "../services/service";
import AdminLayout from "../layouts/Admin";

const PrivateRoute = ({ children, ...rest }) => {
  const ok = service.IsAuthenticated();

  /*
  if (ok && props.path === "/") {
    return <Redirect from="/" to="/dashboard" />;
  }
*/
  return (
    <Route
      {...rest}
      render={({ location }) =>
        ok ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
