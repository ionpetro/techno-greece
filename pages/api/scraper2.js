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
      const list = document.querySelector(
        "section > div > div > :last-child > div > ul.grid"
      );

      const dates = list.querySelector(":first-child").children;
      // remove ads
      const dates_array = Array.from(dates).filter(
        (node) => !node.innerHTML.includes("adSlot")
      );

      // for each date node, I want to retrieve the event info and add
      // the date as an attribute
      return dates_array.map((node) => {
        const dateText = node
          .querySelector("div > h3 > span")
          .textContent.replace("/", "");
        return new Date(`${dateText} 2023`).toString();
      });
    });

    res.status(200).json({ response: result });
    await browser.close();
  } catch (e) {
    res.status(400).json({ error: e });
    console.log(e);
  }
}
