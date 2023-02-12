import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";

const Challenge = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [askForUser, setAskForUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState();

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
  }, [router, user]);

  const checkMatch = async () => {
    let isMatch = false;
    try {
      const { data } = await supabase.from("challenge").select();
      data.forEach(({ buddy_phone, user_phone }) => {
        if (
          buddy_phone === +router.query.buddy &&
          user_phone === +user?.phone
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
      data.forEach(({ user_phone }) => {
        if (user_phone === +user.phone) {
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
      console.log("User doesn't exist");
    }
  };

  if (askForUser) {
    return (
      <form onSubmit={handleSubmit}>
        <h3>what's you phone?</h3>
        <input
          type={"tel"}
          pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"
          onChange={(e) => setUser({ phone: e.target.value })}
        />
        <Button type={"submit"}>Submit</Button>
      </form>
    );
  }

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return <div>{result ? <h1>Match!</h1> : <h1>No match</h1>}</div>;
  }

  return null;
};

export default Challenge;
