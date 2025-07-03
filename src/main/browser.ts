import puppeteer from 'puppeteer-core';
import store from 'src/main/main';
import StoreKeys from 'src/storeConfig';
import path from 'path';
import os from 'os';

const homedir = os.homedir();

export async function launchBrowser(isHeadless: boolean = false) {
  return await puppeteer.launch({
    executablePath: store.get(StoreKeys.userChromePath),
    headless: isHeadless, // Set to true for headless mode
    userDataDir: path.join(homedir, 'CheckMateData'),
  });
}

export async function BrowserCheck(val: string) {
  const browser = await launchBrowser(false); // TODO: should be true
  const page = await browser.newPage();
  await page.goto(val);
  await page.locator('.container').wait();
  const containerText = await page.$eval('.container', (el) => el.textContent);
  await browser.close();
  return containerText;
}
