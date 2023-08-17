import React from "react";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TagGroup from "./TagGroup";

export default ({ title, subtitle, date, tags, bestOf }) => (
  <header>
    <h1 style={{ marginLeft: 0 }}>{title}</h1>
    <div className="subtitle" style={{ display: "flex", flexWrap: "wrap" }}>
      {subtitle && <span>{subtitle}</span>}
      {date && (
        <div style={{ paddingRight: "15px" }}>
          <FontAwesomeIcon icon={faCalendarAlt} />{" "}
          <time style={{ marginLeft: "5px" }} dateTime={date}>
            {date}
          </time>
        </div>
      )}
      {bestOf && <span style={{ paddingRight: "15px" }}>⭐ Top post!</span>}
      <TagGroup tags={tags} />
    </div>
  </header>
);
