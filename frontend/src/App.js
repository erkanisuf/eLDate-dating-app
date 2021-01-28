import React from "react";

import AllProfiles from "./components/profiles/AllProfiles";
import { Switch, Route } from "react-router-dom";
import SingleProfile from "./components/profiles/SingleProfile";
import MyMessages from "./components/messages/MyMessages";
import Layout from "./Layout/Layout";
import PrivateRoute from "./CustomHook/PrivateRoute";
import Login from "./components/user/Login";
import RegistrationForm from "./components/user/RegistrationForm ";
import RedirectProfile from "./components/user/RedirectProfile";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import MatchPage from "./components/match/MatchPage";
import Home from "./components/Home/Home";
import MyMatches from "./components/match/MyMatches";

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

          <Route path="/register">
            <RegistrationForm />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/resetpassword/:id">
            <ResetPassword />
          </Route>
          <PrivateRoute path="/allprofiles/:id" component={SingleProfile} />
          <PrivateRoute exact path="/allprofiles" component={AllProfiles} />

          <PrivateRoute exact path="/matchme" component={MatchPage} />
          <PrivateRoute exact path="/mymatches" component={MyMatches} />
          <PrivateRoute exact path="/mymessages" component={MyMessages} />
          <PrivateRoute path="/updatemyprofile" component={RedirectProfile} />

          <Route path="/">
            <Home />
          </Route>
          {/* Router */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
