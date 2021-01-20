import React from "react";
import "./Layout.css";
import Myprofile from "../components/user/Myprofile";
import { Link } from "react-router-dom";
//ANT
import {
  HomeOutlined,
  MessageOutlined,
  FireOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const Layout = (props) => {
  return (
    <div className="LayoutBackgorund">
      <div className="transperantBackground">
        <div className="leftMenu">
          <Myprofile />
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
            <SettingOutlined style={{ fontSize: "25px", cursor: "Pointer" }} />
            Settings
          </div>
        </div>
        <div className="rightMenu">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
