import {
    chromium, ChromiumBrowser, ChromiumBrowserContext, Page,
} from 'playwright';

import Screenshot from '../../utils/screenshot';
import PageHelper from '../../utils/pageHelper';
import DbHelper from '../../utils/dbHelper';
import Api from '../../utils/api';

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
        await DbHelper.deleteUser('conduit', pageHelper.user);
        await (new Screenshot(page)).currentTestScreenshot();
        await page.close();
    });

    it('should register user', async () => {
        // page.on('request', async (request) => {
        //     if (request.method() === 'OPTIONS') {
        //         console.log(
        //             `>>REQUEST ${request.url()} \nKEYS:${Object.keys(request.headers())} \nVALUES:${Object.values(request.headers())}\n ${await request.response()}`,
        //         );
        //     }
        // });
        // page.on('response', async (response) => {
        //     if (response.request().method() !== 'GET') {
        //         console.log(
        //             `RESPONSE>> ${response.request().method()} ${await response.body()} \nKEYS:${Object.keys(response.headers())} \nVALUES:${Object.values(response.headers())}\n ${response.status()} ${response.url()}`,
        //         );
        //     }
        // });
        const mainPage = new Main(page);
        await (await mainPage.signUpLink())?.click();
        const signUpPage = new SignUp(page);
        expect(await page.title()).toBe('Conduit'); // useless
        expect(await signUpPage.header()).toBeTruthy();
        await signUpPage.signUp(pageHelper.user, pageHelper.email, pageHelper.password);
        expect(await mainPage.loginedUser(pageHelper.user)).toBeTruthy();
    });
});

describe('User login:', () => {
    beforeAll(async () => {
        await DbHelper.addDefaultUser('conduit');
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
    });
    afterAll(async () => {
        await DbHelper.deleteUser('conduit', 'defaultuser');
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
        await (new Screenshot(page)).currentTestScreenshot();
        await page.close();
    });

    it('should not login user with incorrect credentials', async () => {
        await (await (new Main(page)).loginLink())?.click();
        const loginPage = new LogIn(page);
        await loginPage.signInWithCreds(
            pageHelper.incorrectEmail, pageHelper.incorrectPassword,
        );
        expect(await loginPage.errorMessage('email or password is invalid')).toBeTruthy();
    });
});
