import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux"; //REDUX
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoged = useSelector((state) => state.AmiLogged);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
