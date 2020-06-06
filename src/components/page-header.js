import React from "react";

export default ({ title, subtitle, date }) => (
  <header>
    <h1>{title}</h1>
    {subtitle && <span className="subtitle">{subtitle}</span>}
    {date && (
      <span className="subtitle">
        <time dateTime={date}>{date}</time>
      </span>
    )}
  </header>
);
