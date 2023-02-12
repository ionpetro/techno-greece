import React from "react";
import NoMatchIcon from "/public/nomatch.svg";
import styles from "./NoMatch.module.scss";

const NoMatch = () => {
  return (
    <div className={styles.wrapper}>
      <img src={NoMatchIcon.src} />
      <h1>No match </h1>
      <p>Keep looking bitch</p>
    </div>
  );
};

export default NoMatch;
