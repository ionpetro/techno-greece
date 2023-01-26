import React from "react";
import { formatDate } from "../../lib/formatDate";
import styles from "./Events.module.scss";

const Events = ({ data }) => {
  return (
    <section className={styles.section}>
      {Object.entries(data).map(([date, events]) => (
        <div key={date}>
          <div className={styles.date}>{formatDate(date)}</div>
          <div className={styles.events}>
            {events.map(({ id, title, location, dj, image_url }) => (
              <div key={id}>
                <div
                  className={styles.card}
                  style={{ backgroundImage: `url(${image_url})` }}
                />
                <div className={styles.cardBody}>
                  <h3>{title}</h3>
                  <div>{dj}</div>
                  <div>@ {location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Events;
