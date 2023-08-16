import React from "react";

import {
  faGithub,
  faHackerNews,
  faImdb,
  faInstagram,
  faKeybase,
  faKickstarter,
  faLinkedin,
  faMastodon,
  faNpm,
  faPython,
  faReddit,
  faStackOverflow,
  faSteam,
  faVine,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "../components/Link";

// this has a lot of colors: https://simpleicons.org/
const links = [
  {
    header: "Social",
    list: [
      {
        href: "https://mastodon.social/@xavdid",
        icon: faMastodon,
        name: "Mastodon",
        description: "my most active social media presence",
        color: "#6364FF",
      },
      {
        href: "https://lobste.rs/u/xavdid",
        icon: "🦞",
        name: "Lobste.rs",
        description: "where I'm still learning what's up",
      },
      {
        href: "https://tildes.net/user/xavdid",
        icon: "~",
        name: "Tildes.net",
        description: "for something like Reddit, but not quite",
      },
      {
        href: "https://news.ycombinator.com/user?id=xavdid",
        icon: faHackerNews,
        name: "Hacker News",
        description: "where I try to be kind",
        color: "#F0652F",
      },
      {
        href: "https://old.reddit.com/user/xavdid",
        icon: faReddit,
        name: "Reddit",
        description: "for occasional comments",
        color: "#FF4500",
      },
    ],
  },
  // technical
  {
    header: "Technical",
    list: [
      {
        href: "https://github.com/xavdid",
        icon: faGithub,
        name: "GitHub",
        description: "where all my code lives",
      },
      {
        href: "https://pypi.org/user/xavdid/",
        icon: faPython,
        name: "PyPI",
        description: "where my Python packages are released",
      },
      {
        href: "https://www.npmjs.com/~xavdid",
        icon: faNpm,
        name: "npm",
        description: "where my Javascript packages are released",
        color: "#CB3837",
      },
      {
        href: "https://stackoverflow.com/users/1825390/xavdid",
        icon: faStackOverflow,
        name: "StackOverflow",
        description: "where I ask, edit, and answer programming questions.",
        color: "#f68a1f",
      },
      {
        href: "https://keybase.io/xavdid",
        icon: faKeybase,
        name: "Keybase",
        description: "which has my public key and other verified webites.",
        color: "#33A0FF",
      },
      {
        href: "https://www.linkedin.com/in/xavdid/",
        icon: faLinkedin,
        name: "LinkedIn",
        description: "for my full detailed work history",
        color: "#0A66C2",
      },
    ],
  },

  {
    header: "etc.",
    list: [
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
        color: "#E4405F",
      },
      {
        href: "https://www.youtube.com/user/Xavdidtheshadow/videos",
        icon: faYoutube,
        name: "YouTube",
        description: "full of a truly eclectic collection of moving pictures.",
        color: "#FF0000",
      },
      {
        href: "https://www.kickstarter.com/profile/brownman",
        icon: faKickstarter,
        name: "Kickstarter",
        description:
          "where I back friends' projects, playing cards, and board games.",
        color: "#05CE78",
      },
      {
        href: "https://www.imdb.com/name/nm5598028",
        icon: faImdb,
        name: "IMDb",
        description: "to collect my numerous professional acting credits.",
        color: "#F5C518",
      },
      {
        href: "https://vine.co/u/923740547368235008",
        icon: faVine,
        name: "Vine",
        description:
          "a defunct collection of discretized snippets of 6 second awesomeness.",
        color: "#00b488",
      },
    ],
  },
];

const ListOfLinks = ({ list }) => {
  return (
    <ul key={list[0].color}>
      {list.map(({ href, icon, name, description, color }) => (
        <li key={href}>
          {typeof icon === "string" ? (
            <span style={{ paddingRight: "5px" }}>{icon}</span>
          ) : (
            <FontAwesomeIcon
              icon={icon}
              color={color}
              style={{ paddingRight: "5px" }}
            />
          )}
          <Link href={href}>{name}</Link>, {description}
        </li>
      ))}
    </ul>
  );
};

export default () => (
  <ul style={{ lineHeight: "1.5" }}>
    {links.map(({ header, list }) => {
      return (
        <>
          <li key={`header-${header}`}>{header}</li>
          <ListOfLinks key={`list-${list}`} list={list} />
        </>
      );
    })}
  </ul>
);
