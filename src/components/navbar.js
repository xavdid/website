import React from "react";

// adapted from https://codepen.io/coderyang/pen/eJXXQg

export default () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      // alignContent: "space-around",
      // backgroundColor: "lightblue",
      width: "100%",
      height: "100px",
      zIndex: "-100",
      borderBottom: "1px solid black",
    }}
  >
    <ul className="navbar">
      <li className="navbar-item">Home</li>
      <li className="navbar-item">Blog</li>
      <li className="navbar-item">Projects</li>
      <li className="navbar-item">Sundries</li>
    </ul>
  </div>
);
