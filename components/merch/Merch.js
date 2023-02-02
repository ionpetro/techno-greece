import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import UiSpinner from "../ui/UiSpinner/UiSpinner";
import styles from "./Merch.module.scss";
import White1 from "../../public/images/merch/merchwhite1.jpg";
import White2 from "../../public/images/merch/merchwhite2.jpg";
import Black1 from "../../public/images/merch/merchblack1.jpg";
import Black2 from "../../public/images/merch/merchblack2.jpg";

const Merch = () => {
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  //
  // useEffect(() => {
  //   const merch = window.localStorage.getItem("merch");
  //
  //   if (merch) {
  //     const { color, size, email } = JSON.parse(merch);
  //
  //     setSize(size);
  //     setColor(color);
  //     setEmail(email);
  //     setIsSubmitted(true);
  //   }
  // }, []);

  const [color, setColor] = useState("white");
  const [size, setSize] = useState("L");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { color, size, email };

    try {
      setLoading(true);
      await supabase.from("merch").upsert(data);
      // window.localStorage.setItem("merch", JSON.stringify(data));
      setLoading(false);
      setIsSubmitted(true);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <section id={"merch"} className={styles.wrapper}>
      <div className={"wrapper"}>
        <h2>Merch</h2>
        <div className={styles.infoWrapper}>
          <div className={styles.image}>
            <Image
              unoptimized
              layout={"fill"}
              objectFit={"cover"}
              objectPosition={"center"}
              alt={`white`}
              src={color === "white" ? White1.src : Black1.src}
            />
          </div>
          {isSubmitted ? (
            <div className={styles.info}>
              <h3>You request has been submitted!</h3>
              <p>
                We will contact you at <span>{email}</span> about the payment
                and to delivery information for a t-shirt of color{" "}
                <span>{color}</span> and size <span>{size}</span>.
              </p>
              <p>Until then... find the party to rock this t-shirt</p>
              <Button onClick={() => router.push("/events")}>
                All Parties
              </Button>
            </div>
          ) : (
            <form className={styles.info} onSubmit={handleSubmit}>
              <h3>{color} Techno Greece X Para Todos T-shirt</h3>
              <div className={styles.text}>
                Join the rave community! Order our merch and we will contact you
                with details. Play hard, party harder.
              </div>
              <div className={styles.specs}>
                <div>
                  <label className={styles.label}>Color</label>
                  <div className={styles.colors}>
                    <div
                      className={`${styles.color} ${
                        color === "white" && styles.active
                      }`}
                      onClick={() => setColor("white")}
                    >
                      <span className={styles.white}></span>
                    </div>
                    <div
                      className={`${styles.color} ${
                        color === "black" && styles.active
                      }`}
                      onClick={() => setColor("black")}
                    >
                      <span className={styles.black}></span>
                    </div>
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="size">
                    Size
                  </label>
                  <select className={styles.select} name={"size"}>
                    <option value={"S"} onClick={() => setSize("S")}>
                      S
                    </option>
                    <option value={"M"} onClick={() => setSize("M")}>
                      M
                    </option>
                    <option
                      value={"L"}
                      onClick={() => setSize("L")}
                      selected={"selected"}
                    >
                      L
                    </option>
                    <option value={"XL"} onClick={() => setSize("XL")}>
                      XL
                    </option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.label}>Email</div>
                <input
                  required
                  placeholder={"e.g. thecoolest@gmail.com"}
                  className={styles.input}
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
              </div>
              <Button type={"submit"} disabled={loading}>
                {loading ? (
                  <div className={styles.loader}>
                    <UiSpinner />
                  </div>
                ) : (
                  "Order"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Merch;
