import { Page } from 'playwright';

class Screenshot {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    currentTestScreenshot = async () => {
        const regexp = /([\w|\s]*):\s([\w|\s]*)/;
        const testName = expect.getState().currentTestName;
        const result = testName.match(regexp);
        await this.page.screenshot(
            {
                path: `screenshots/${result![1]}/${result![2]}.png`,
            },
        );
    }
}

export default Screenshot;
