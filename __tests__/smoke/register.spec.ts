import {
    chromium, ChromiumBrowser, ChromiumBrowserContext, Page,
} from 'playwright';

import Screenshot from '../../utils/screenshot';
import PageHelper from '../../utils/pageHelper';
import DbHelper from '../../utils/dbHelper';

import Main from '../../pages/main';
import SignUp from '../../pages/signup';
import LogIn from '../../pages/login';

let browser: ChromiumBrowser;
let context: ChromiumBrowserContext;
let page: Page;
let pageHelper: PageHelper;

describe('Register user:', () => {
    beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
    });
    afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });
    beforeEach(async () => {
        page = await context.newPage();
        pageHelper = new PageHelper(page);
        await pageHelper.openNewDefaultPage();
    });
    afterEach(async () => {
        DbHelper.dropDb('conduit');
        await (new Screenshot(page)).currentTestScreenshot();
        await page.close();
    });

    fit('should register user', async () => {
        const mainPage = new Main(page);
        await (await mainPage.signUpLink())?.click();
        const signUpPage = new SignUp(page);
        expect(await page.title()).toBe('Conduit'); // useless
        expect(await signUpPage.header()).toBeTruthy();
        await signUpPage.signUp(pageHelper.user, pageHelper.email, pageHelper.password);
        expect(await mainPage.loginedUser(pageHelper.user)).toBeTruthy();
    });

    xit('should not login user with incorrect credentials', async () => {
        await (await (new Main(page)).loginLink())?.click();
        await (new LogIn(page)).signInWithCreds('fake@email.com', 'incorrect_pass');
        await page.waitForTimeout(5000);
    });
});
