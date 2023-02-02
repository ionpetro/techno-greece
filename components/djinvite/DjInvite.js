import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Techno from "../../public/images/technogreececolorlogo.png";
import styles from "./DjInvite.module.scss";
import Button from "../ui/button/Button";

const DjInvite = () => {
  const router = useRouter();

  return (
    <div>
      <div className={styles.promoWrapper}>
        <div className={styles.wrap}>
          <div>
            <div>
              Are you a <span className={styles.dj}>dj</span> looking to:
            </div>
            <ul className={styles.list}>
              <li>Find parties to play</li>
              <li>Promote your mixes</li>
              <li>Expand your reach</li>
            </ul>
          </div>
          <div className={styles.button}>
            <Button onClick={() => router.push("/dj-register")}>
              Register here
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DjInvite;
