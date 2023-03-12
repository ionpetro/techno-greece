import "../styles/globals.scss";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const handleRouteChange = (url) => {
    window.gtag("config", "G-962F4LQL7E", {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Techno Greece</title>
      </Head>
      <Navbar />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-962F4LQL7E"
      />
      <Script
        id={"analytics"}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-962F4LQL7E');
            `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
