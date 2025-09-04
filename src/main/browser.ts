import puppeteer, { Browser, Page, ScreenshotOptions } from 'puppeteer-core';
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

function isValidLocator(locator: string) {
  return !(locator === '' || locator == undefined);
}

async function checkText(page: Page, locator: string): Promise<string> {
  if (isValidLocator(locator)) {
    locator = 'body';
  }
  await page.locator(locator).wait();
  const elementText = await page.$eval(locator, (el) => el.textContent);
  return elementText || '';
}

async function checkHtml(page: Page, locator: string): Promise<string> {
  if (isValidLocator(locator)) {
    return await page.$eval(locator, (el) => el.innerHTML);
  }
  return await page.content();
}

async function checkScreenshot(
  page: Page,
  locator: string,
): Promise<Uint8Array> {
  const options: ScreenshotOptions = { fullPage: true, encoding: 'base64' };
  if (isValidLocator(locator)) {
    const boundingBox: DOMRect = await page
      .$eval(locator, (el) => el.getBoundingClientRect())
      .then((result) => {
        console.log('screenshot bounding box', result);
        return result;
      });
    if (
      boundingBox.x &&
      boundingBox.y &&
      boundingBox.height &&
      boundingBox.width
    ) {
      // defaults to full page if bounding box fails
      options.fullPage = false;
      options.clip = {
        x: boundingBox.x,
        y: boundingBox.y,
        height: boundingBox.height,
        width: boundingBox.width,
      };
    }
  }
  return await page
    .screenshot(options)
    .then((result) => {
      console.log('screenshot successful');
      return result;
    })
    .catch((error) => {
      console.log('screenshot failed');
      console.log(error);
      return error;
    });
}

export async function BrowserCheck(checkConfig: CheckDb): Promise<Discovery> {
  // TODO: should be headless or as config
  const browser: Browser = await launchBrowser(false);
  const page: Page = await browser.newPage();
  page.setDefaultTimeout(10000); // ms
  await page.goto(checkConfig.browserConfig.url);
  let discovery: Discovery = {} as Discovery;
  const locator = checkConfig.browserConfig.locator;
  if (checkConfig.browserConfig.checkText) {
    discovery.text = await checkText(page, locator).then((result) => {
      console.log('Text successful', result);
      return result;
    });
  }
  if (checkConfig.browserConfig.checkHtml) {
    discovery.html = await checkHtml(page, locator).then((result) => {
      console.log('HTML successful', result);
      return result;
    });
  }
  if (checkConfig.browserConfig.checkScreenshot) {
    discovery.screenshot = await checkScreenshot(page, locator);
  }
  await browser.close();
  discovery.timestamp = new Date();
  return discovery;
}
