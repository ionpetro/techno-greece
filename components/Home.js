import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { prepareEvents } from "../lib/prepareEvents";
import Techno from "../public/images/techno.jpeg";
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
      <div className={styles.wrapper}>
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
      <div>
        {Object.entries(data).map(([date, events]) => (
          <div key={date}>
            <div>{date}</div>
            <div className={styles.events}>
              {events.map(({ id, title, location, dj, image_url }) => (
                <div key={id}>
                  <h1>{title}</h1>
                  <div>{location}</div>
                  <div>{dj}</div>
                  <Image
                    width={"300"}
                    height={"300"}
                    src={image_url}
                    alt={title}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
