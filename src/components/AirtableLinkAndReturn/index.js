import React from "react";

import Link from "../Link";

export default ({ items, verbed, year, link }) => {
  return (
    <>
      <hr />
      <p style={{ textAlign: "center" }}>
        <em>
          See the full list of {items} I {verbed} during {year}, including
          ratings and reviews, on <Link href={link}>Airtable</Link>
        </em>
      </p>
      <p style={{ textAlign: "center" }}>
        <em>
          return to the <Link href="#TOC">table of contents</Link>
        </em>{" "}
        ↩️
      </p>
    </>
  );
};
