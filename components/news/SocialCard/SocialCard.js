import React from "react";
import styles from "./SocialCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/technologo.jpg";
import { isThreeDaysAgo } from "../../../utils/utilities";

const SocialCard = ({ media }) => {
  // show new label when the post was published the last 3 days
  const isNew = !isThreeDaysAgo(media.timestamp);
  const selectMediaSrc = (media) => {
    if (!media.thumbnail_url && !media.media_url) {
      return Logo.src;
    }
    if (media.media_type === "VIDEO") {
      return media.thumbnail_url;
    } else if (
      media.media_type === "IMAGE" ||
      media.media_type === "CAROUSEL_ALBUM"
    ) {
      return media.media_url;
    }
  };

  return (
    <div className={`${styles.container} ${isNew && styles.new}`}>
      {isNew && (
        <div className={styles.newLabel}>
          <em>New</em>
        </div>
      )}
      <div>
        <Link href={media.permalink} legacyBehavior>
          <a target={"_blank"} rel={"noreferrer"}>
            <div className={styles.image}>
              <Image
                unoptimized
                key={media.id}
                layout={"fill"}
                objectFit={"cover"}
                objectPosition={"center"}
                alt={`instagram image ${media.id}`}
                src={selectMediaSrc(media)}
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SocialCard;
