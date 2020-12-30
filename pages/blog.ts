import { Page } from 'playwright';

class Blog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    header = "//h1[@class='display-3']"
}

export default Blog;
