import React, { useEffect } from "react";
import MatchIcon from "/public/match.svg";
import renderConfetti from "../../utils/renderConfetti";
import styles from "./Match.module.scss";

const Match = () => {
  useEffect(() => {
    renderConfetti();
  }, []);

  return (
    <div className={styles.wrapper}>
      <canvas className={styles.confetti} id={"canvas"}></canvas>
      <img src={MatchIcon.src} className={styles.match} />
      <h1>
        It's a <span>match!</span>
      </h1>
      <ul>
        <li>Take a photo/video with your buddy</li>
        <li>Post the photo/video on the WhatsApp group</li>
        <li>Post a story on instagram tagging @techno__greece</li>
        <li>
          Get the chance to win:
          <br /> 1️⃣st place: 2 Tickets for a techno event
          <br /> 2️⃣nd place: 2 Techno greece T-shirts
          <br /> 3️⃣rd place: 1 bottle of vodka
        </li>
      </ul>
    </div>
  );
};

export default Match;
