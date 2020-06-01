import React from "react";

import Link from "../components/Link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faEnvelope,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  faGithub,
  faNpm,
  faKeybase,
  faStackOverflow,
  faVine,
  faUntappd,
  faImdb,
} from "@fortawesome/free-brands-svg-icons";

const links = [
  {
    href: "https://github.com/xavdid",
    icon: faGithub,
    name: "GitHub",
    description: "where all my code lives",
  },
  {
    href: "https://www.npmjs.com/~xavdid",
    icon: faNpm,
    name: "npm",
    description: "where JS packages are released",
  },
  {
    href: "https://stackoverflow.com/users/1825390/xavdid",
    icon: faStackOverflow,
    name: "StackOverflow",
    description: "where I sometimes appear less clueless than I am",
  },
  // {
  //   href: "https://stackoverflow.com/users/1825390/xavdid",
  //   icon: faStackOverflow,
  //   name: "StackOverflow",
  //   description: "where I sometimes appear less clueless than I am",
  // },
];

export default () => (
  <ul style={{ lineHeight: "1.5" }}>
    {links.map(({ href, icon, name, description }) => (
      <li key={href}>
        <Link to={href}>
          <FontAwesomeIcon icon={icon} /> {name}
        </Link>
        , {description}
      </li>
    ))}
  </ul>
);
