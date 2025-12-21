// adapted from https://github.com/dazulu/react-spoiler-tag

import { useState } from "preact/hooks";

import "./spoiler.scss";

const ariaLabelShowText = "To reveal spoiler text click here.";
const ariaLabelHideText = "To hide spoiler text again click here.";

const Spoiler = ({ text = "SPOILER", children }) => {
  const [isHidden, setHidden] = useState(true);

  const handleClick = () => {
    setHidden(!isHidden);
  };

  return (
    <span
      onClick={handleClick}
      className={`spoiler${isHidden ? " spoiler--hidden" : ""}`}
      aria-label={isHidden ? ariaLabelShowText : ariaLabelHideText}
    >
      {isHidden ? text : <span className="spoiler-inner">{children}</span>}
    </span>
  );
};
export default Spoiler;
