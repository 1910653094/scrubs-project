import React from "react";
import { slide as Menu } from "react-burger-menu";
import { ReactComponent as DashboardIcon } from "../../assets/icons/Dashboard.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/Profile.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/Logout.svg";
import NavItem from "../NavItem/NavItem";
const MSMenu = (props) => {
  /* showSettings (event) {
        event.preventDefault();
        .
        .
        .
      }*/

  var isMenuOpen = function (state) {
    return state.isOpen;
  };

  return (
    <Menu {...props}>
      {/*<NavItem
        icon={<DashboardIcon />}
        text="Your Borrowings"
        to="/m/dashboard"
      />
      <NavItem icon={<ProfileIcon />} text="Profiles" to="/m/profile" />
      <NavItem icon={<LogoutIcon />} text="Logout" to="/logout" /> */}

      <a id="home" className="menu-item" href="/">
        Your Borrwings
      </a>
      <a id="about" className="menu-item" href="/about">
        Profile
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Logout
      </a>
      {/*<a onClick={this.showSettings} className="menu-item--small" href="">
        Logout
      </a>*/}
    </Menu>
  );
};

export default MSMenu;
