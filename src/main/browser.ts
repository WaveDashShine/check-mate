import puppeteer from 'puppeteer-core';
import store from './main'

async function BrowserCheck(val: string) {
  const browser = await puppeteer.launch({
    executablePath: store.get('userChromePath'),
    headless: false, // Set to true for headless mode
  });
  const page = await browser.newPage();
  await page.goto(val);
  await page.locator('.container').wait();
  const containerText = await page.$eval('.container', el => el.textContent);
  await browser.close();
  return containerText;
}

export default BrowserCheck;
