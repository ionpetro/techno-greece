const puppeteer = require("puppeteer");
import { createClient } from "@supabase/supabase-js";
import { autoScroll } from "../../utils/autoscroll";

export default async function handler(req, res) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const browser = await puppeteer.launch({ headless: false }); // default is true
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
          const image_url = eventNode.querySelector("img").getAttribute("src");
          events.push({ title, location, dj, image_url, date });
        });
      });

      return events;
    });

    // insert to supabase
    await supabase.from("events").insert(result);
    res.status(200).json({ response: result });
    await browser.close();
  } catch (e) {
    res.status(400).json({ error: e });
    console.log(e);
  }
}
