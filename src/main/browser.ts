import puppeteer, { Page, Browser } from 'puppeteer-core';
import store from 'src/main/main';
import StoreKeys from 'src/storeConfig';
import path from 'path';
import os from 'os';
import { Discovery } from 'src/schema/discovery';
import { CheckDb } from 'src/schema/check';

const homedir = os.homedir();

export async function launchBrowser(isHeadless: boolean = false) {
  return await puppeteer.launch({
    executablePath: store.get(StoreKeys.userChromePath),
    headless: isHeadless, // Set to true for headless mode
    userDataDir: path.join(homedir, 'CheckMateData'),
  });
}

async function checkText(page: Page, locator: string): Promise<string> {
  await page.locator(locator).wait();
  const elementText = await page.$eval(locator, (el) => el.textContent);
  return elementText || '';
}

async function checkHtml(page: Page, locator: string): Promise<string> {
  return ''; // stub
}

export async function BrowserCheck(checkConfig: CheckDb): Promise<Discovery> {
  const browser: Browser = await launchBrowser(false); // TODO: should be true
  const page: Page = await browser.newPage();
  await page.goto(checkConfig.browserConfig.url);
  await browser.close();
  const locator = checkConfig.browserConfig.locator;
  const locatorText = await checkText(page, locator);
  // TODO: return discovery object?
  // TODO: discovery id will need to be handled in the frontend
  let discovery: Discovery = {} as Discovery;
  discovery.timestamp = new Date();
  return discovery;
}
