import { ElementHandle, Page } from 'playwright';

export default class SignUp {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async header(): Promise<ElementHandle | null> {
        return this.page.$('xpath=//h1[contains(text(), "Sign up")]');
    }

    private async usenameField(): Promise<ElementHandle | null> {
        return this.page.$('xpath=//input[@placeholder="Username"]');
    }

    private async emailField(): Promise<ElementHandle | null> {
        return this.page.$('xpath=//input[@placeholder="Email"]');
    }

    private async passwordField(): Promise<ElementHandle | null> {
        return this.page.$('xpath=//input[@placeholder="Password"]');
    }

    private async loginBtn(): Promise<ElementHandle | null> {
        return this.page.$('xpath=//button[contains(text(), "Sign up")]');
    }

    public async signUp(username: string, email:string, password: string): Promise<void> {
        await (await this.usenameField())?.fill(username);
        await (await this.emailField())?.fill(email);
        await (await this.passwordField())?.fill(password);
        await (await this.loginBtn())?.click();
        await this.page.waitForTimeout(5000);
    }
}
