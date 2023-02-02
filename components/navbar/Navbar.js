import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import Image from "next/image";

export const menuItems = [
  { name: "home", href: "" },
  { name: "events", href: "events" },
  { name: "merch", href: "/#merch" },
  { name: "news", href: "/#social" },
];

const Navbar = () => {
  const instaUrl = "https://www.instagram.com/techno__greece/";
  const phone = "6972765869";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <div className={styles.compWrap}>
      <div />
      <div className={styles.actions}>
        <div className={styles.menu} onClick={() => setOpen(!open)}>
          <span className={open ? styles.isOpen : null} />
        </div>
      </div>
      <div
        className={
          open
            ? `${styles.container} ${styles.containerActive}`
            : styles.container
        }
      >
        <Image
          unoptimized
          alt={"navbar background overlay"}
          src={"/images/techno.jpeg"}
          layout={"fill"}
          objectFit={"cover"}
          objectPosition={"center"}
        />
        <ul className={styles.sections}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link onClick={() => setOpen(false)} href={`/${item.href}`}>
                <span className={styles.text}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.footer}>
          <li>
            <a href={instaUrl} target={"_blank"} rel={"noreferrer"}>
              INSTAGRAM
            </a>
          </li>
          <span className={styles.bullet} />
          <li>
            <a href={`tel:${phone}`}>PHONE</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
