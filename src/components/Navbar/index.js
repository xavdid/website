import React from "react";
import { Link } from "gatsby";

// adapted from https://codepen.io/coderyang/pen/eJXXQg

import "./navbar.scss";

export default () => (
  <nav className="header">
    <h1>David Brownman</h1>
    <ul className="navbar">
      <Link to="/" className="navbar-item" activeClassName="active">
        Home
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
        to="/misc"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Sundries
      </Link>
    </ul>
  </nav>
);
