import { Html, Head, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>👽 Techno Greece</title>
        {/* preconnect scripts... */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alumni+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <script
          type="text/javascript"
          src="//connect.facebook.net/en_US/sdk.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(window.fbAsyncInit = (function () {\n" +
              "              FB.init({\n" +
              '                appId: "3238400696470513",\n' +
              "                xfbml: true,\n" +
              '                version: "v15.0",\n' +
              "              });\n" +
              "              FB.AppEvents.logPageView();\n" +
              "            })(\n" +
              "              (function (d, s, id) {\n" +
              "                var js,\n" +
              "                  fjs = d.getElementsByTagName(s)[0];\n" +
              "                if (d.getElementById(id)) {\n" +
              "                  return;\n" +
              "                }\n" +
              "                js = d.createElement(s);\n" +
              "                js.id = id;\n" +
              '                js.src = "https://connect.facebook.net/en_US/sdk.js";\n' +
              "                fjs.parentNode.insertBefore(js, fjs);\n" +
              '              })(document, "script", "facebook-jssdk")\n' +
              "            ))",
          }}
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
