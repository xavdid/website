import React from "react";
import Link from "../Link";

import "./view_full_size.scss";

const ViewFullSize = ({ href }) => {
  return (
    <p className="full-size-link">
      <Link href={href}>
        <em>view full size</em>
      </Link>
    </p>
  );
};

export default ViewFullSize;
