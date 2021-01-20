import React, { useEffect } from "react";

import Axios from "axios";
import { useDispatch } from "react-redux";
import Main from "./Main";
import AllProfiles from "./components/profiles/AllProfiles";
import { Switch, Route } from "react-router-dom";
import SingleProfile from "./components/profiles/SingleProfile";
import MyMessages from "./components/messages/MyMessages";
import Layout from "./Layout/Layout";

function App() {
  const dispatch = useDispatch();

  //Gives me Token with my ID
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/getcookie`,
    })
      .then((res) => {
        //This sets token cookie with id
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  });
  ///Gives me my Profile Stats
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/users/getuser`,
    })
      .then((res) => {
        console.log(res, "MYPROFILE?");
        dispatch({
          type: "FETCH_MY_PROFILE",
          action: res.data.profile,
        });
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  });
  //Gets my COnversations
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: `http://localhost:4000/chat/getmyconversations`,
    })
      .then((res) => {
        console.log(res);
        // setMyMessages(res.data);
        dispatch({ type: "FETCH_MY_CONVERSATIONS", action: res.data });
      })
      .catch((error) => {
        console.log(error.response.status); // 401
        console.log(error.response.data);
      });
  }, [dispatch]);
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/allprofiles/:id">
            <SingleProfile />
          </Route>
          <Route path="/allprofiles">
            <AllProfiles />
          </Route>
          <Route path="/mymessages">
            <MyMessages />
          </Route>
          <Route path="/"></Route>
          {/* Router */}
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
