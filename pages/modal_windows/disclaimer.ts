import { Page } from 'playwright';

class Disclaimer {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get header() { return "xpath=//div[@class='modal-header']"; }

    get body() { return "xpath=//div[@class='modal-body']"; }

    get footer() { return "xpath=//div[@class='modal-footer']"; }

    get closeBtn() { return `${this.header} >> xpath=/button[@type='button']/span[.='×']`; }

    get goToMapBtn() { return `${this.footer} >> xpath=/button[@type='button']`; }

    get blog() { return 'css=p:nth-of-type(3) > a:nth-of-type(1)'; }

    get roadmap() { return `${this.body} >> //a[@href='https://native-land.ca/staging-site/about/roadmap/']`; }

    async clickOn(element: string) {
        await this.page.click(element);
    }
}

export default Disclaimer;
