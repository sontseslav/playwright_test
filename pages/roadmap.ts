import { Page } from 'playwright';

class Roadmap {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    header = "//h1[@class='display-3']"
}

export default Roadmap;
