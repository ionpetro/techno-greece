import { createClient } from "@supabase/supabase-js";
import { autoScroll } from "../../utils/autoscroll";
let puppeteer;
if (process.env.NODE_ENV === "production") {
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}
const chrome = require("chrome-aws-lambda");

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const browser = await puppeteer.launch(
      process.env.NODE_ENV === "production"
        ? {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless,
          }
        : { headless: false }
    );
    const page = await browser.newPage();
    await page.setViewport({
      width: 1290,
      height: 1300,
      deviceScaleFactor: 1,
    });
    await page.goto("https://ra.co/events/gr/all");
    await autoScroll(page);

    const result = await page.evaluate(() => {
      const events = [];
      const list = document.querySelector(
        "section > div > div > :last-child > div > ul.grid"
      );

      const dates = list.querySelector(":first-child").children;
      // remove ads
      const datesArray = Array.from(dates).filter(
        (node) => !node.innerHTML.includes("adSlot")
      );

      // for each date node, I want to retrieve the event info and add
      // the date as an attribute
      datesArray.forEach((node) => {
        const dateText = node
          .querySelector("div > h3 > span")
          .textContent.replace("/", "");
        const date = new Date(
          `${dateText} ${new Date().getFullYear()}`
        ).toString();

        // remove the date node and hold the event nodes
        const eventsOfDay = Array.from(node.children);
        eventsOfDay.shift();

        // loop through the events of the day
        eventsOfDay.forEach((eventNode) => {
          const title = eventNode.querySelector(
            "ul .grid > li > div > h3"
          ).textContent;

          // check if dj info is missing
          const dj =
            eventNode.querySelector("ul .grid > li > div").children.length === 3
              ? eventNode.querySelector("ul .grid > li > div > :nth-child(2)")
                  .textContent
              : null;
          const location = eventNode.querySelector(
            "ul .grid > li > div > :last-child > div > div"
          ).textContent;

          // check if there is an image
          const image_node = eventNode.querySelector("img");
          let image_url = "";
          if (image_node) {
            image_url = image_node.getAttribute("src");
          }
          events.push({ title, location, dj, image_url, date, origin: "ra" });
        });
      });

      return events;
    });

    // insert to supabase
    await supabase.from("events").upsert(result);
    res.status(200).json({ response: result });
    await browser.close();
  } catch (e) {
    res.status(400).json({ error: e });
    console.log(e);
  }
}
