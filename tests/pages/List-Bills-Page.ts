import { expect, type Locator, type Page } from '@playwright/test';

export class BillsPage {
    //Attributes
    readonly page: Page;

    readonly CreateBillButton: Locator;
    readonly backButton: Locator;


    //Const
    constructor(page: Page) {
        this.page = page;
        this.CreateBillButton = page.getByRole('link', { name: 'Create Bill' });
        this.backButton = page.getByText('Back');

    }

    // Methods / functions
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }
    async performLogin() {

        await this.CreateBillButton.click();



    }

    async performBackToList() {

        await this.backButton.click();



    }


}