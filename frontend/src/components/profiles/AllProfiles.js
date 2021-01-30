import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { usenullOrEmpty } from "../../CustomHook/chekifNull";
import moment from "moment";
import Filters from "./Filters";
//ANT DESIGN
import { Avatar, Button, Card, Spin } from "antd";
const AllProfiles = () => {
  const { Meta } = Card;
  // Ant Design Meta
  const [allprofiles, setallProfiles] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [fetchBackProfiles, setfetchBackProfiles] = useState(false);
  const [error, setError] = useState("");
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
  }, [fetchBackProfiles]);

  const filterProfiles = (param) => {
    Axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: param,
      withCredentials: true,
      url: "http://localhost:4000/profiles/filterProfile",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsFiltered(true);
          if (!res.data.data.length) {
            setError("No results found with this filter!");
          }
          setallProfiles(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeButtonAndReFetch = () => {
    setfetchBackProfiles(!fetchBackProfiles);
    setIsFiltered(false);
  };
  if (!allprofiles.length) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",

            marginBottom: "10px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "5px",
          }}
        >
          <Filters filterProfiles={filterProfiles} />
          {isFiltered && (
            <Button
              style={{ marginLeft: "5px" }}
              onClick={closeButtonAndReFetch}
            >
              {" "}
              X Remove Filters
            </Button>
          )}
        </div>
        <Spin size="large" />
        <span style={{ color: "red" }}>{error && error}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: window.innerWidth <= 768 ? "flex-end" : "flex-start",
          width: "100%",
          marginBottom: "10px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "5px",
        }}
      >
        <Filters filterProfiles={filterProfiles} />
        {isFiltered && (
          <Button style={{ marginLeft: "5px" }} onClick={closeButtonAndReFetch}>
            {" "}
            X Remove Filters
          </Button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          maxHeight: "80vh",
          margin: "0 auto",
          overflowY: "scroll",
        }}
      >
        {allprofiles.map((el, index) => {
          return (
            <div
              key={index}
              style={{
                margin: "5px",
              }}
            >
              <Link to={`/allprofiles/${el.profile_id}`}>
                <Card
                  hoverable
                  style={{
                    width: window.innerWidth <= 768 ? 150 : 200,
                    padding: "15px",
                  }}
                  cover={
                    <Avatar
                      style={{ border: "1px solid #003a8c" }}
                      size={window.innerWidth <= 768 ? 120 : 180}
                      src={
                        el.images.length
                          ? el.images[0]
                          : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                      }
                    />
                  }
                >
                  <Meta
                    title={
                      <div
                        style={{
                          fontSize: window.innerWidth <= 768 ? "12px" : "",
                        }}
                      >
                        {el.nickname ? el.nickname : el.fullname},
                        <p style={{ fontSize: "12px", color: "#ccc" }}>
                          {moment(el.age, "YYYYMMDD").fromNow(true)}
                        </p>
                      </div>
                    }
                    // {moment(el.age, "YYYYMMDD").fromNow(true)}
                    description={usenullOrEmpty(el.city)}
                  />
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProfiles;
