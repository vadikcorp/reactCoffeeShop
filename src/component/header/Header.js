import React from "react";
import logo from "../../styles/img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="rectangle" />
      <div className="header_bar">
        <div className="header_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header_info">
          <div className="search_icon">
            <i className="fa fa-search" />
          </div>
          <div className="notification_icon">
            <i className="fa fa-bell" />
          </div>
          <div className="username">
            <span>Hoover</span>
            <i className="fa fa-caret-down" />
          </div>
          <div className="profile_icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
