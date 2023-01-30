import React from "react";
import { formatDate } from "../../lib/formatDate";
import styles from "./Events.module.scss";

const Events = ({ data }) => {
  const sortedData = Object.entries(data).sort(
    ([date1], [date2]) => new Date(date1).getTime() > new Date(date2).getTime()
  );

  return (
    <section className={styles.section}>
      {sortedData.map(([date, events]) => (
        <div key={date}>
          <div className={styles.date}>
            <span>{formatDate(date).weekday}</span>, {formatDate(date).month}
          </div>
          <div className={styles.events}>
            {events.map(({ id, title, location, dj, image_url }) => (
              <div key={id}>
                <div
                  className={styles.card}
                  style={{
                    backgroundImage: image_url && `url(${image_url})`,
                  }}
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
