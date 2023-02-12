import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "../ui/button/Button";
import UiSpinner from "../ui/UiSpinner/UiSpinner";
import styles from "./Challenge.module.scss";
import Match from "./Match";
import NoMatch from "./NoMatch";

const Challenge = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [askForUser, setAskForUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();
  const [error, setError] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // get user from localstorage or set if exists
  useEffect(() => {
    const userFromLocal = window.localStorage.getItem("user");
    if (userFromLocal) {
      const localUser = JSON.parse(userFromLocal);
      setUser(localUser);
    } else {
      setAskForUser(true);
    }
  }, []);

  useEffect(() => {
    if (router.query.buddy && user) {
      checkMatch();
    }
  }, [router]);

  const checkMatch = async () => {
    let isMatch = false;
    try {
      const { data } = await supabase.from("challenge").select();
      data.forEach(({ buddy_phone, user_phone }) => {
        if (
          (buddy_phone === +router.query.buddy ||
            buddy_phone === +user?.phone) &&
          (user_phone === +user?.phone || user_phone === +router.query.buddy)
        ) {
          isMatch = true;
        }
      });
      setResult(isMatch);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const playerExists = async (user) => {
    let userExists = false;
    try {
      const { data } = await supabase.from("challenge").select();
      data.forEach(({ user_phone, buddy_phone }) => {
        if (user_phone === +user.phone || buddy_phone === +user.phone) {
          userExists = true;
        }
      });
      return userExists;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await playerExists(user)) {
      window.localStorage.setItem("user", JSON.stringify(user));
      router.reload();
    } else {
      setError(true);
    }
  };

  if (askForUser) {
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3 className={styles.question}>Type your phone number</h3>
        <div className={styles.note}>we will only ask you this once 😊</div>
        {error && (
          <div className={styles.error}>
            Oups, we forgot to add you to the game <br />
            Contact{" "}
            <a
              href={"https://www.instagram.com/ionpetro/"}
              className={styles.link}
              target={"_blank"}
              rel="noreferrer"
            >
              @ionpetro
            </a>
          </div>
        )}
        <input
          type={"tel"}
          className={styles.input}
          pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
          onChange={(e) => setUser({ phone: e.target.value })}
        />
        <Button type={"submit"}>Submit</Button>
      </form>
    );
  }

  if (loading) {
    return <UiSpinner />;
  } else {
    return <>{result ? <Match /> : <NoMatch />}</>;
  }

  return null;
};

export default Challenge;
