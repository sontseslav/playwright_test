import { Page } from 'playwright';

export default class PageHelper {
    public user = 'john';

    public password = 'password_123';

    public email = 'jdoe@email.com';

    public incorrectEmail = 'fake@email.com';

    public incorrectPassword = 'incorrect_pass';

    public static defaultUser = 'defaultuser';

    public static defaultUserEmail = 'default@mail.com';

    public static defaultUserPassword = 'password';

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    openNewDefaultPage = async () => {
        await this.page.goto('http://localhost:8080/', { waitUntil: 'domcontentloaded' });
    }
}
