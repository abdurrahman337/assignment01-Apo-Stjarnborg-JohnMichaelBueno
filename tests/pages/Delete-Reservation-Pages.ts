import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { assert } from 'console';

export class DeleteReservationPage {
    // Attributes
    readonly page: Page;
    readonly ActionDelete: Locator;
    readonly DropdownOptions: Locator;
    readonly headingLocator: Locator;


    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.ActionDelete = page.locator('.action')
        this.DropdownOptions = page.locator('.dropdown-menu a');  // Locator for the dropdown options
        this.headingLocator = page.locator('role=heading[name="Jonas Hellman: 2020-04-01 -"]');

    }

    // Methods
    async goto() {
        // Navigate to the base URL (ensure BASE_URL is set in environment variables)
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // CreateReservation method
    async deleteReservation() {
        // Fill in the start and end dates (use dynamic or default dates
        // await this.ActionDelete.selectOption({ index: 1 }); // Adjust index as needed
        await this.page.locator('.action').click();
        await this.page.locator('#app > div > div.reservations > div > div.menu > a:nth-child(2)').click();
        await expect(this.headingLocator).not.toBeVisible();
    }
}