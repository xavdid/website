import React from "react";

import Link from "../Link";

export default ({ items, verbed, year }) => {
  return (
    <>
      <hr />
      <p style={{ textAlign: "center" }}>
        <em>
          See all the {items} I {verbed} in {year} at{" "}
          <Link href={`https://david.reviews/${items}/years/${year}`}>
            david.reviews/{items}
          </Link>
          .
        </em>
      </p>
    </>
  );
};
