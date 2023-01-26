import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  const emojis = ["🎵", "💊", "🪩", "👽", "🌈", "💀", "🫀", "🇬🇷"];
  const [emoji, setEmoji] = useState(emojis[0]);

  useEffect(() => {
    let pos = 0;
    const id = setInterval(() => {
      setEmoji(emojis[pos % emojis.length]);
      pos = pos + 1;
    }, 1000);

    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div className={styles.promoWrapper}>
        <span className={styles.alien}>{emoji}</span>
        <div>
          Promo of <span className={styles.techno}>T</span>echno
        </div>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => (location.href = "mailto:technogreece0@gmail.com")}
          >
            <span>Email</span>
          </button>
          <button
            className={styles.button}
            onClick={() =>
              (location.href = "https://www.instagram.com/techno__greece/")
            }
          >
            <span>Instagram</span>
          </button>
        </div>
      </div>
      <div className={styles.footer}>© 2023 Techno Greece</div>
    </div>
  );
};

export default Footer;
