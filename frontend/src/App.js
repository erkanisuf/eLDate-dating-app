import React from "react";

import AllProfiles from "./components/profiles/AllProfiles";
import { Switch, Route } from "react-router-dom";
import SingleProfile from "./components/profiles/SingleProfile";
import MyMessages from "./components/messages/MyMessages";
import Layout from "./Layout/Layout";
import PrivateRoute from "./CustomHook/PrivateRoute";
import Login from "./components/user/Login";
import RegistrationForm from "./components/user/RegistrationForm ";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/login">
            <div style={{ margin: "0 auto" }}>
              <h1 style={{ color: "red" }}>
                You need to log in to use this part
              </h1>
              <Login />
            </div>
          </Route>
          <Route path="/allprofiles/:id">
            <SingleProfile />
          </Route>
          <PrivateRoute exact path="/allprofiles" component={AllProfiles} />
          <PrivateRoute exact path="/mymessages" component={MyMessages} />
          <Route path="/register">
            <RegistrationForm />
          </Route>
          <Route path="/"></Route>
          {/* Router */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
