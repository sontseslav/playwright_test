import {
    chromium, ChromiumBrowser, ChromiumBrowserContext, Page,
} from 'playwright';

import Disclaimer from '../../pages/modal_windows/disclaimer';
import Blog from '../../pages/blog';
import Roadmap from '../../pages/roadmap';
import Screenshot from '../../utils/screenshot';

let browser: ChromiumBrowser;
let context: ChromiumBrowserContext;
let page: Page;
let disclaimerPage: Disclaimer;

describe('Disclaimer modal window checks:', () => {
    beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
    });
    afterAll(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await context.newPage();
        disclaimerPage = new Disclaimer(page);
        await page.goto('https://native-land.ca/');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForLoadState();
    });
    afterEach(async () => {
        await (new Screenshot(page)).currentTestScreenshot();
        await page.close();
    });

    it('should appear disclaimer window', async () => {
        await page.waitForSelector(disclaimerPage.header);
        await page.waitForSelector(disclaimerPage.body);
        await page.waitForSelector(disclaimerPage.footer);
    });

    it('should open blog', async () => {
        await page.click(disclaimerPage.blog);
        await page.waitForLoadState('load', { timeout: 60000 });
        expect(await page.title()).toBe('Native-Land.ca | Our home on native land');
        const blog = new Blog(page);
        expect(await page.innerText(blog.header)).toBe('Community & Blog');
    });

    it('should open roadmap', async () => {
        await page.click(disclaimerPage.roadmap);
        await page.waitForLoadState();
        const roadmap = new Roadmap(page);
        expect(await page.innerText(roadmap.header)).toBe('Roadmap');
    });
});
