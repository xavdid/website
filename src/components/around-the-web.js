import React from "react";

import Link from "../components/Link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGithub,
  faNpm,
  faKeybase,
  faStackOverflow,
  faVine,
  faImdb,
  faKickstarter,
  faInstagram,
  faSteam,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const links = [
  // technical
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
    description: "where my Javascript packages are released",
  },
  {
    href: "https://stackoverflow.com/users/1825390/xavdid",
    icon: faStackOverflow,
    name: "StackOverflow",
    description: "where I ask, edit, and answer programming questions.",
  },
  {
    href: "https://keybase.io/xavdid",
    icon: faKeybase,
    name: "Keybase",
    description: "which has my public key and other verified webites.",
  },
  // non-technical
  {
    href: "https://steamcommunity.com/id/xavdidtheshadow/",
    icon: faSteam,
    name: "Steam",
    description: "where I can show off my gaming habit.",
  },
  {
    href: "https://www.instagram.com/xavdid/",
    icon: faInstagram,
    name: "Instagram",
    description: "where I post ART.",
  },
  {
    href: "https://www.youtube.com/user/Xavdidtheshadow/videos",
    icon: faYoutube,
    name: "YouTube",
    description: "full of a truly eclectic collection of moving pictures.",
  },
  {
    href: "https://www.kickstarter.com/profile/brownman",
    icon: faKickstarter,
    name: "Kickstarter",
    description:
      "where I back friends' projects, playing cards, and board games.",
  },
  {
    href: "https://www.imdb.com/name/nm5598028",
    icon: faImdb,
    name: "IMDb",
    description: "to collect my numerous professional acting credits.",
  },
  {
    href: "https://vine.co/u/923740547368235008",
    icon: faVine,
    name: "Vine",
    description:
      "a defunct collection of discretized snippets of 6 second awesomeness.",
  },
];

export default () => (
  <ul style={{ lineHeight: "1.5" }}>
    {links.map(({ href, icon, name, description }) => (
      <li key={href}>
        <Link href={href}>
          <FontAwesomeIcon icon={icon} /> {name}
        </Link>
        , {description}
      </li>
    ))}
  </ul>
);
