import React from "react";
import { Link } from "gatsby";

// adapted from https://codepen.io/coderyang/pen/eJXXQg

import "./navbar.scss";

export default () => (
  <nav className="header">
    <Link to="/">
      <h1>David Brownman</h1>
    </Link>
    <div className="navbar">
      <Link to="/" className="navbar-item" activeClassName="active">
        About
      </Link>
      <Link
        to="/blog"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Blog
      </Link>
      <Link
        to="/projects"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Projects
      </Link>
      <Link
        to="/contact"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Contact
      </Link>
    </div>
  </nav>
);
