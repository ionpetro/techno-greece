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
      const headings_elements = document.querySelectorAll(
        "ul .grid > :first-child > div"
      );
      const headings_array = Array.from(headings_elements);
      return headings_array.length;
    });

    res.status(200).json({ response: result });
    await browser.close();
  } catch (e) {
    res.status(400).json({ error: "error" });
    console.log(e);
  }
}
