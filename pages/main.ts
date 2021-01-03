import { Page } from 'playwright';

export default class Main {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async loginLink() {
        return this.page.$('css=.nav-link >> text=Sign in');
    }

    public async signUpLink() {
        return this.page.$('xpath=//a[@href="/register"]');
    }

    public async loginedUser(user: string) {
        return this.page.waitForSelector(`xpath=//a[@href="/@${user}/"]`);
    }
}
