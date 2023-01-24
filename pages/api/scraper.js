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
    await page.goto("https://ra.co/events/gr/all");
    await autoScroll(page);

    const result = await page.evaluate(() => {
      const events = [];

      // heading
      const headings_elements = document.querySelectorAll(
        "ul .grid > li > div > h3"
      );
      const headings_array = Array.from(headings_elements);
      headings_array.map((heading) => {
        events.push({
          title: heading.textContent,
        });
      });

      // dj
      const dj_elements = document.querySelectorAll(
        "ul .grid > :nth-child(2) > div > :nth-child(2) > span"
      );
      const dj_array = Array.from(dj_elements);
      dj_array.map((dj, idx) => {
        events[idx].dj = dj.textContent;
      });

      // location
      const location_elements = document.querySelectorAll(
        "ul .grid > li > div > :last-child"
      );
      const location_array = Array.from(location_elements);
      location_array.map((location, idx) => {
        events[idx].location = location.textContent;
      });

      // img
      const img_elements = document.querySelectorAll("img");
      const img_array = Array.from(img_elements);
      img_array.map((img, idx) => {
        if (idx < 4) return;
        events[idx - 4].image_url = img.getAttribute("src");
      });

      return events;
    });

    const { data, error } = await supabase.from("events").insert(result);

    res.status(200).json({ response: result });
    await browser.close();
  } catch (e) {
    res.status(400).json({ error: "error" });
    console.log(e);
  }
}
