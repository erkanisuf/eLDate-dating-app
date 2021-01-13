import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const AllProfiles = () => {
  const [allprofiles, setallProfiles] = useState([]);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/profiles/allprofiles",
    })
      .then((res) => {
        console.log(res);
        setallProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>All Profiles</h1>
      {allprofiles.map((el, index) => {
        return (
          <div style={{ border: "1px solid black" }} key={index}>
            <Link to={`/allprofiles/${el.profile_id}`}>
              <p>{el.fullname}</p>
              <p>{el.profile_id}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllProfiles;
