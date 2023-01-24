import Image from "next/image";
import React, { useEffect, useState } from "react";
import Techno from "../public/images/techno.jpeg";
import styles from "./Home.module.scss";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchEvents = async () => {
    await fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setData(data.response));
  };

  useEffect(() => {
    try {
      fetchEvents();
      setData(data.response);
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
      <div className={styles.events}>
        {data?.map(({ title, location, dj, image_url }) => (
          <div>
            <h1>{title}</h1>
            <div>{location}</div>
            <div>{dj}</div>
            <Image width={"300"} height={"300"} src={image_url} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
