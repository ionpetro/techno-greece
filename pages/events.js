import axios from "axios";
import React from "react";
import Events from "../components/events/Events";
import absoluteUrl from "next-absolute-url";
import Footer from "../components/footer/Footer";
import { prepareEvents } from "../lib/prepareEvents";

const EventsPage = ({ data }) => {
  return (
    <>
      <div className="wrapper">
        <h1 className={"heading"}>Events</h1>
        <Events data={data} all />
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  const {
    data: { response: data },
  } = await axios.get(`${origin}/api/events`);
  return {
    props: { data: prepareEvents(data) },
  };
}

export default EventsPage;
