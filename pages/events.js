import axios from "axios";
import React from "react";
import Events from "../components/events/Events";
import absoluteUrl from "next-absolute-url";
import { prepareEvents } from "../lib/prepareEvents";

const EventsPage = ({ data }) => {
  return (
    <div className="wrapper">
      <Events data={data} all />
    </div>
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
