import axios from "axios";
import React, { useEffect, useState } from "react";

const News = () => {
  const mediaCount = 8;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const { access_token } = await axios.get(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`
        );
        const { data } = await axios.get(
          `https://graph.instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_ID}/media?fields=media_type,thumbnail_url,media_url,timestamp,permalink,id&access_token=${access_token}`
        );
        console.log(data);
        setLoading(false);
        setMediaArray(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchMedia();
  }, []);

  return <div>news</div>;
};

export default News;
