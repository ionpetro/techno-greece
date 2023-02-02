import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./DjRegistrationForm.module.scss";
import Button from "../../ui/button/Button";
import UiSpinner from "../../ui/UiSpinner/UiSpinner";

const DjRegistrationForm = () => {
  const router = useRouter();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await supabase.from("artists").upsert(data);
      setLoading(false);
      setIsSubmitted(true);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.success}>
        <h3>You have been registered successfully!</h3>
      </div>
    );
  }

  return (
    <form className={styles.info} onSubmit={handleSubmit}>
      <h3>General Info</h3>
      <div className={styles.grid}>
        <div className={styles.field}>
          <div className={styles.label}>Nickname</div>
          <input
            required
            placeholder={"eg. Solomun"}
            className={styles.input}
            onChange={(e) => setData({ ...data, nickname: e.target.value })}
          />{" "}
        </div>
        <div />
        <div className={styles.field}>
          <div className={styles.label}>First name</div>
          <input
            required
            placeholder={"eg. Mladen"}
            className={styles.input}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
          />{" "}
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Last name</div>
          <input
            required
            placeholder={"eg. Solomun"}
            className={styles.input}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
          />{" "}
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Email</div>
          <input
            required
            placeholder={"e.g. solomun@gmail.com"}
            className={styles.input}
            type={"email"}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />{" "}
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Phone</div>
          <input
            placeholder={"e.g. 6969696969"}
            className={styles.input}
            type={"tel"}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />{" "}
        </div>
      </div>
      <div className={styles.grid1}>
        <div className={styles.field}>
          <div className={styles.label}>Short description</div>
          <textarea
            className={styles.textarea}
            placeholder={
              "eg. I'm a techno and electro DJ/producer from South France, and part of the duo Siamese Society.\n" +
              "I love cosmic, minimal and psychedelic sounds that I put into my sets and productions to create my own style"
            }
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
      </div>
      <h3>Links</h3>
      <div className={styles.grid1}>
        <div className={styles.field}>
          <div className={styles.label}>Profile Image URL</div>
          <input
            required
            placeholder={"eg. https://www.somewhere.com/me.png"}
            className={styles.input}
            onChange={(e) => setData({ ...data, image_url: e.target.value })}
          />{" "}
        </div>
        <div />
        <div className={styles.field}>
          <div className={styles.label}>Instagram</div>
          <input
            placeholder={"eg. https://www.instagram.com/solomun/"}
            className={styles.input}
            onChange={(e) => setData({ ...data, ig_url: e.target.value })}
          />{" "}
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Spotify</div>
          <input
            placeholder={
              "eg. https://open.spotify.com/artist/5wJK4kQAkVGjqM9x46KQOC"
            }
            className={styles.input}
            onChange={(e) => setData({ ...data, spotify_url: e.target.value })}
          />{" "}
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Soundcloud</div>
          <input
            placeholder={"e.g. https://soundcloud.com/solomun"}
            className={styles.input}
            onChange={(e) =>
              setData({ ...data, soundcloud_url: e.target.value })
            }
          />{" "}
        </div>
      </div>
      <Button type={"submit"} disabled={loading}>
        {loading ? (
          <div className={styles.loader}>
            <UiSpinner />
          </div>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};

export default DjRegistrationForm;
