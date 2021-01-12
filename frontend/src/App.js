import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Main from "./Main";
function App() {
  const counter = useSelector((state) => state.mainreducer);
  const isLogedin = useSelector((state) => state.isLogedin);
  console.log(isLogedin);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>Redux</h1>
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
      <Main />
    </div>
  );
}

export default App;
