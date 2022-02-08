import React from "react";
import { Link } from "gatsby";
import { useGoatCounter } from "gatsby-plugin-goatcounter";

import "./link.scss";

export default ({
  href,
  name,
  children,
  className = "body-link",
  ...props
}) => {
  const count = useGoatCounter();
  return (
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
            onClick={() => {
              // log the event manually, but don't preventDefault()
              count({
                path: `ext-${href}`,
                event: true,
              });
            }}
          >
            {children}
          </a>
        ))}
    </>
  );
};
