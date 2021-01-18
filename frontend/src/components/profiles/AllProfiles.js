import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { usenullOrEmpty } from "../../CustomHook/chekifNull";
//ANT DESIGN
import { Avatar, Card } from "antd";
const AllProfiles = () => {
  const { Meta } = Card;
  // Ant Design Meta
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
    <div
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {allprofiles.map((el, index) => {
        return (
          <div
            key={index}
            style={{
              margin: "5px",
              position: "relative",
              "&:hover": {
                transoform: "scale(2)",
              },
            }}
          >
            <Link to={`/allprofiles/${el.profile_id}`}>
              <Card
                hoverable
                style={{ width: 240, padding: "15px" }}
                cover={
                  <Avatar
                    style={{ border: "1px solid #003a8c" }}
                    size={200}
                    src={
                      el.images !== null
                        ? el.images[0]
                        : "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"
                    }
                  />
                }
              >
                <Meta
                  title={usenullOrEmpty(el.nickname)}
                  description={usenullOrEmpty(el.city)}
                />
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllProfiles;
