<<<<<<< Updated upstream:frontend/src/components/nav/navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logoPath from "../../assets/bramcollegeclear.png";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={"/profile"}>Profile</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (

        <div>
          {/* <Link to={"/signup"}>Signup</Link>
          <Link to={"/login"}>Login</Link> */}
          <button onClick={() => this.props.openModal('signup')}>Sign Up</button>
          <button onClick={() => this.props.openModal('login')}>Log In</button>

        </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar">
        {/*<h1>CGDb</h1>*/}
        <div className="logo-assets">
          <img src={logoPath} alt="logo" />
          <h1>BRAM COLLEGE</h1>
        </div>
        {this.getLinks()}
      </nav>
    );
  }
}

export default Navbar;
=======

import React from 'react';
import { Link } from 'react-router-dom'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                <Link to={'/signup'}>Signup</Link>
                <Link to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
            <h1>CGDb</h1>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;
>>>>>>> Stashed changes:frontend/src/components/nav/navbar.js
