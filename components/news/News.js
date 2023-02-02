import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UiSpinner from "../ui/UiSpinner/UiSpinner";
import styles from "./News.module.scss";
import logo from "../../public/images/technogreececolorlogo.png";
import SocialCard from "./SocialCard/SocialCard";

const News = () => {
  const mediaCount = 8;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const {
          data: { access_token },
        } = await axios.get(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`
        );
        const { data } = await axios.get(
          `https://graph.instagram.com/me/media?fields=media_type,thumbnail_url,media_url,timestamp,permalink,id&access_token=${access_token}`
        );

        // const { data } = await axios.get(
        //   `https://graph.instagram.com/17859512528738773/children?fields=media_type,thumbnail_url,media_url&access_token=${access_token}`
        // );

        setLoading(false);
        setMediaArray(data.data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchMedia();
  }, []);

  return (
    <section className={styles.compWrap} id={"social"}>
      <h2>News</h2>
      <div>
        <div className={styles.main}>
          {loading ? (
            <UiSpinner />
          ) : error ? (
            <div className={styles.error}>
              Something went wrong with Instagram 😔
            </div>
          ) : (
            <div className={styles.media}>
              {mediaArray.slice(0, mediaCount).map((media) => (
                <SocialCard key={media.id} media={media} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.transitionBot} />
    </section>
  );
};

export default News;
