import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('test card', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false,
      slowMo: 1000,
      devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  describe('test del', () => {
    test('should del', async () => {
      await page.goto(baseUrl);
      const pageTab = await page.$('[data-id=div]');
      const del = await pageTab.$('[data-id=del]');
      await page.screenshot({path: '9000.png'});
      del.click();
      await page.waitFor(1000);
      await page.screenshot({path: 'after9000.png'});
    });
  });
  
});
