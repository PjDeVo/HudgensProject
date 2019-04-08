import React from "react";
import { NavLink } from "react-router-dom";

const NavigationContainer = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink activeClassName="nav-class-active" exact to="/blog">
          {" "}
          Blog
        </NavLink>
      </div>
    );
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink activeClassName="nav-class-active" exact to="/">
            {" "}
            Home
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink activeClassName="nav-class-active" exact to="/about-me">
            {" "}
            About
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink activeClassName="nav-class-active" exact to="/contact">
            {" "}
            Contact
          </NavLink>
        </div>
        {props.loggedInStatus === "LOGGED_IN"
          ? dynamicLink("/blog", "Blog")
          : null}
      </div>

      <div className="right-side">Patrick DeVincentis</div>
    </div>
  );
};

export default NavigationContainer;
