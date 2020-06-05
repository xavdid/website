import React from "react";

export default ({ title, subtitle }) => (
  <header>
    <h1>{title}</h1>
    {subtitle && <span className="subtitle">{subtitle}</span>}
  </header>
);
