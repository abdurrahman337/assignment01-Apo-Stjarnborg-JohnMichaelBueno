import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
export class CreateBillPage {
    // Attributes
    readonly page: Page;
    readonly BillValue: Locator;
    readonly SaveBillButton: Locator;
    readonly BackBillListButton: Locator;
    readonly Checkbox: Locator;


    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.BillValue = page.locator('div').filter({ hasText: /^Value \(SEK\)$/ }).getByRole('spinbutton');
        this.Checkbox = page.locator('.checkbox');
        this.SaveBillButton = page.getByText('Save');
        this.BackBillListButton = page.getByText('Back');
    }

    // Methods / functions
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // CreateRoom method
    async createBill(billValue) {
        billValue = faker.number.int({ min: 800, max: 2500 })
        await this.BillValue.fill(billValue);
        await this.Checkbox.click();
        await this.SaveBillButton.click();


    }
}