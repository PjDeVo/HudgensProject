import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationContainer = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink activeClassName="nav-class-active" exact to={route}>
          {" "}
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log("we messed up", error);
      });
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

        <div className="nav-link-wrapper">
          <NavLink activeClassName="nav-class-active" exact to="/blog">
            {" "}
            Blog
          </NavLink>
        </div>

        {props.loggedInStatus === "LOGGED_IN"
          ? dynamicLink("/portfolio-manager", "Portfolio Manager")
          : null}
      </div>

      <div className="right-side">
        Patrick DeVincentis
        {props.loggedInStatus === "LOGGED_IN" ? (
          <a onClick={handleSignOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(NavigationContainer);
