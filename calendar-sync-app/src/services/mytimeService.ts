import { chromium } from "playwright";
import { Shift } from "../types/shift";
import { PACIFIC } from "../utils/time";

export async function fetchShiftsMyTime(user: string, pass: string): Promise<Shift[]> {
  const shifts: Shift[] = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://mytime.target.com/");
  await page.fill('input[name="username"]', user);
  await page.fill('input[name="password"]', pass);
  await page.click('button[type="submit"]');
  await page.waitForLoadState("networkidle");

  await page.goto("https://mytime.target.com/schedule");
  await page.waitForSelector(".shift-card");

  const cards = await page.$$(".shift-card");
  for (const c of cards) {
    const date = await c.getAttribute("data-date");
    const start = await c.getAttribute("data-start");
    const end = await c.getAttribute("data-end");
    const role = await c.getAttribute("data-role") || "Shift";

    if (date && start && end) {
      shifts.push({
        id: `${date}-${start}-${end}-${role}`.toLowerCase().replace(/\s+/g, "-"),
        title: role,
        start: PACIFIC(date, start),
        end: PACIFIC(date, end)
      });
    }
  }

  await browser.close();
  return shifts;
}
