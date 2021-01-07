import { ElementHandle, Page } from 'playwright';

export default class Login {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async errorMessage(message: string): Promise<ElementHandle | null> {
        return this.page.waitForSelector(`//li[text()="${message}"]`);
    }

    public async emailField(): Promise<ElementHandle | null> {
        return this.page.waitForSelector('xpath=//input[@type="email"]');
    }

    public async passwordField(): Promise<ElementHandle | null> {
        return this.page.waitForSelector('xpath=//input[@type="password"]');
    }

    public async loginBtn(): Promise<ElementHandle | null> {
        return this.page.$('xpath=//button[contains(text(), "Sign in")]');
    }

    public async signInWithCreds(email:string, password: string): Promise<void> {
        await (await this.emailField())?.click();
        await (await this.emailField())?.fill(email);
        await (await this.passwordField())?.click();
        await (await this.passwordField())?.fill(password);
        await (await this.loginBtn())?.click();
    }
}
