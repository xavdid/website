import React from "react";

import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tag from "../Tag";

import "./tag-group.scss";

const TagGroup = ({ tags }) =>
  (tags && tags.length > 0 && tags && (
    <div
      className="tag-group"
      style={{
        fontSize: "small",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <FontAwesomeIcon id="tag-icon" icon={faTag} />

      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  )) ||
  null;

export default TagGroup;
