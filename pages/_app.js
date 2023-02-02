import "../styles/globals.scss";
import Navbar from "../components/navbar/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>👽 Techno Greece</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
