import React from "react";
import "./Layout.css";
import Myprofile from "../components/user/Myprofile";
import { Link } from "react-router-dom";
import EditProfile from "../components/user/EditProfile";
import Login from "../components/user/Login";
import Axios from "axios";
//ANT
import {
  HomeOutlined,
  MessageOutlined,
  FireOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
const Layout = (props) => {
  const logout = () => {
    Axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },

      withCredentials: true,
      url: "http://localhost:4000/users/logout",
    }).then((res) => console.log(res));
  };
  return (
    <div className="LayoutBackgorund">
      <div className="transperantBackground">
        <div className="leftMenu">
          <Myprofile />
          <Login />
          <div className="Menu">
            <nav>
              <ul className="navigator">
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/"
                >
                  <HomeOutlined />
                  Home
                </Link>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/allprofiles"
                >
                  <UsergroupAddOutlined />
                  Profiles
                </Link>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/"
                >
                  <FireOutlined />
                  Match
                </Link>
                <Link
                  style={{
                    color: "white",
                  }}
                  to="/mymessages"
                >
                  <MessageOutlined />
                  Messages
                </Link>
              </ul>
            </nav>
          </div>
          <div>
            <EditProfile />
            <p style={{ marginTop: "0" }} onClick={logout} className="logout">
              Sign Out
            </p>
          </div>
        </div>
        <div className="rightMenu">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
