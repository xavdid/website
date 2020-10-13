import React from "react";

import Link from "../Link";

// adapted from https://codepen.io/coderyang/pen/eJXXQg

import "./navbar.scss";

export default () => (
  <nav className="header">
    <Link href="/" className="header">
      <h1>David Brownman</h1>
    </Link>
    <div className="navbar" data-nosnippet>
      <Link href="/" className="navbar-item" activeClassName="active">
        About
      </Link>
      <Link
        href="/blog"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Blog
      </Link>
      <Link
        href="/projects"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Projects
      </Link>
      <Link
        href="/contact"
        className="navbar-item"
        activeClassName="active"
        partiallyActive
      >
        Contact
      </Link>
    </div>
  </nav>
);
