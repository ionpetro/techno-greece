import "../styles/globals.scss";
import Navbar from "../components/navbar/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
