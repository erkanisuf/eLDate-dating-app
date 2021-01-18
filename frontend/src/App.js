import React, { useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Main from "./Main";
import AllProfiles from "./components/profiles/AllProfiles";
import { Switch, Route, Link } from "react-router-dom";
import SingleProfile from "./components/profiles/SingleProfile";
import MyMessages from "./components/messages/MyMessages";

function App() {
  const counter = useSelector((state) => state.mainreducer);
  const isLogedin = useSelector((state) => state.isLogedin);
  const dispatch = useDispatch();

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
  return (
    <div className="App">
      <h1>Redux</h1>
      <Link to="/allprofiles">ThiS IS TO ALL PROFILEs</Link>
      <p>
        this is {counter} and not {isLogedin.name}
      </p>
      <p>age {isLogedin.age && isLogedin.age}</p>
      <button onClick={() => dispatch({ type: "DECREMENT", action: 5 })}>
        Change IT biTch
      </button>
      <button
        onClick={() =>
          dispatch({ type: "CHANGE_NAME", data: { name: "erko", age: "25" } })
        }
      >
        nam
      </button>
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
      </Switch>
    </div>
  );
}

export default App;
