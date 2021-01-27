import React, { useState, useEffect } from "react";
import Axios from "axios";
import ChildmyMatch from "./ChildmyMatch";
const MyMatches = () => {
  const [mymatches, setMymatches] = useState([]);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/matches/getmymatches",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) setMymatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",

        display: "flex",
        flexDirection: "row",
        flexWrap: "flex-wrap",
        justifyContent: "flex-start",

        alignContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {mymatches.map((el, index) => {
        return <ChildmyMatch key={index} matchID={el.profile_id} />;
      })}
    </div>
  );
};

export default MyMatches;
