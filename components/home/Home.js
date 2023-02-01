import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { prepareEvents } from "../../lib/prepareEvents";
import Techno from "../../public/images/techno.jpeg";
import Events from "../events/Events";
import Footer from "../footer/Footer";
import News from "../news/News";
import Button from "../ui/button/Button";
import styles from "./Home.module.scss";

const Home = () => {
  const [data, setData] = useState({});
  const router = useRouter();

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
      <div className="wrapper">
        <h2>Events</h2>
        <Events data={data} all={false} />
        <div className={styles.buttonWrapper}>
          <Button onClick={() => router.push("/events")}>All events</Button>
        </div>
        <h2>News</h2>
        <News />
      </div>
      <Footer />
    </>
  );
};

export default Home;
