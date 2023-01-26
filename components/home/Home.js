import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { prepareEvents } from "../../lib/prepareEvents";
import Techno from "../../public/images/techno.jpeg";
import Events from "../events/Events";
import Footer from "../footer/Footer";
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
      <Footer />
    </>
  );
};

export default Home;
