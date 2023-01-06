import React from "react";

import Link from "../Link";

export default ({ items, verbed, year, link }) => {
  return (
    <>
      <hr />
      <p style={{ textAlign: "center" }}>
        <em>
          See all the {items} I {verbed} during {year} (including ratings &
          reviews) on <Link href={link}>Airtable</Link>.
        </em>
      </p>
    </>
  );
};
