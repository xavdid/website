import React from "react";
import { Link } from "gatsby";

import "./link.scss";

export default ({
  href,
  name,
  children,
  className = "body-link",
  ...props
}) => (
  <>
    {href &&
      (href.startsWith("/") ? (
        <Link className={className} to={href} {...props}>
          {children}
        </Link>
      ) : href.startsWith("#") ? (
        <a className={className} href={href}>
          {children}
        </a>
      ) : (
        <a className={className} target="_blank" rel="noreferrer" href={href}>
          {children}
        </a>
      ))}
    {name && <a name={name} />}
  </>
);
