import React from "react";
import { Link } from "gatsby";

// adapted from https://codepen.io/coderyang/pen/eJXXQg

export default () => (
  <nav>
    <h1>David Brownman</h1>
    <ul className="navbar">
      <Link to="/">
        <li className="navbar-item">Home</li>
      </Link>
      <Link to="/">
        <li className="navbar-item">Blog</li>
      </Link>
      <Link to="/">
        <li className="navbar-item">Projects</li>
      </Link>
      <Link to="/">
        <li className="navbar-item">Sundries</li>
      </Link>
    </ul>
  </nav>
);
