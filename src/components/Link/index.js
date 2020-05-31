import React from "react";
import { Link } from "gatsby";

import "./link.scss";

const className = "body-link";
export default ({ to, children }) => (
  <>
    {to.startsWith("http") ? (
      <a className={className} target="_blank" rel="noreferrer" href={to}>
        {children}
      </a>
    ) : (
      <Link className={className} to={to}>
        {children}
      </Link>
    )}
  </>
);
