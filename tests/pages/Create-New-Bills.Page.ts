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

    // CreateBill method
    async createBill() {
        await this.BillValue.fill("850");
        await this.Checkbox.click();
        await this.SaveBillButton.click();


    }
    // CreateUnPaidBill
    async createUnPaidBill() {
        await this.BillValue.fill("900");
        await this.SaveBillButton.click();


    }
}