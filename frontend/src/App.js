import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Main from "./Main";
import AllProfiles from "./components/profiles/AllProfiles";
import { Switch, Route, Link } from "react-router-dom";
import SingleProfile from "./components/profiles/SingleProfile";
function App() {
  const counter = useSelector((state) => state.mainreducer);
  const isLogedin = useSelector((state) => state.isLogedin);
  console.log(isLogedin);
  const dispatch = useDispatch();
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

        <Route path="/"></Route>
      </Switch>
    </div>
  );
}

export default App;
