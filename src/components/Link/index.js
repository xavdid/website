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
        // internal link
        <Link className={className} to={href} {...props}>
          {children}
        </Link>
      ) : href.startsWith("#") ? (
        // local anchor
        <a className={className} href={href}>
          {children}
        </a>
      ) : (
        // external link
        <a
          className={className}
          target="_blank"
          rel="noreferrer"
          href={href}
          data-goatcounter-click={`ext-${href}`}
        >
          {children}
        </a>
      ))}
  </>
);
