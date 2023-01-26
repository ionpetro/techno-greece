import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { prepareEvents } from "../../lib/prepareEvents";
import Techno from "../../public/images/techno.jpeg";
import Events from "../events/Events";
import styles from "./Home.module.scss";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchEvents = async () => {
    const {
      data: { response },
    } = await axios.get("/api/events");
    setData(prepareEvents(response));
  };

  useEffect(() => {
    try {
      fetchEvents();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className={styles.hero}>
        <Image
          alt={"techno"}
          layout={"fill"}
          objectFit={"cover"}
          src={Techno.src}
        />
        <div className={styles.imgFilter} />
        <div className={styles.title}>
          <p className={styles.glitch}>
            <span aria-hidden="true">Techno </span>
            Techno
          </p>
          <p className={`${styles.glitch} ${styles.smallGlitch}`}>
            <span aria-hidden="true">Greece </span>
            Greece
          </p>
        </div>
      </div>
      <div className={styles.wrapper}>
        <h2>Events</h2>
        <Events data={data} />
      </div>
      <div className={styles.promoWrapper}>
        <span className={styles.alien}>👽</span>
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
    </>
  );
};

export default Home;
