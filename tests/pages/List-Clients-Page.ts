import { expect, type Locator, type Page } from '@playwright/test';

export class ListClientsPage {

    readonly CreateClientButton: Locator;
    readonly page: Page;  // Declare the page attribute
    readonly editClientButton: Locator;
    readonly ActionEdit: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.CreateClientButton = page.getByRole('link', { name: 'Create Client' });
        this.editClientButton
        this.ActionEdit = page.locator('.action')

    }

    // Navigate to the base URL
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // Click the "Create Client" button
    async clickCreateClientButton() {
        // Ensure the "Create Client" button is visible before clicking
        await expect(this.CreateClientButton).toBeVisible();
        await this.CreateClientButton.click();
    }


    async editClient() {
        await this.page.locator('.action').first().click();
        await this.page.locator('#app > div > div.clients > div > div.menu > a:nth-child(1)').click();
        //await expect(this.headingLocator).not.toBeVisible();
        await this.page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill("John")
    }
}
