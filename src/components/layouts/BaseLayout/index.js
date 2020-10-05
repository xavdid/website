import React from "react";

import Navbar from "../../Navbar";
import LeftBorder from "../../LeftBorder";

import "./base.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <LeftBorder />
      <div
        style={{
          margin: `0 auto`,
          // see https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/
          maxWidth: `80ch`,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
