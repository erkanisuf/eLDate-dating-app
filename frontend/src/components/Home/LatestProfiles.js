import React, { useEffect, useState } from "react";
import { Avatar, Spin } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";
const LatestProfiles = () => {
  const [lastprofs, setLastprofs] = useState([]);
  useEffect(() => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "https://dateappeldate.herokuapp.com/profiles/latestprofile",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setLastprofs(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, []);
  if (!lastprofs.length) {
    return (
      <div
        style={{
          width: "100%",
          height: "300px",
          marign: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Spin size="large" />
        Loading...
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {lastprofs.map((el, index) => {
        return (
          <div key={index} style={{ margin: "0 auto" }}>
            <Link to={`/allprofiles/${el.profile_id}`}>
              <Avatar
                style={{ border: "1px solid pink" }}
                size={{ xs: 55, sm: 22, md: 32, lg: 44, xl: 50, xxl: 80 }}
                src={el.images[0]}
                alt={el.fullname}
              />
              <p>{el.fullname}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default LatestProfiles;
