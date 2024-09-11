import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateReservationPage {
    // Attributes
    readonly page: Page;
    readonly StartDate: Locator;
    readonly EndDate: Locator;
    readonly Client: Locator;
    readonly Room: Locator;
    readonly Bill: Locator;
    readonly SaveReservationButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.StartDate = page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.EndDate = page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.Client = page.locator('div').filter({ hasText: /^Client- Not selected -Jonas Hellman \(#1\)Mikael Eriksson \(#2\)$/ }).getByRole('combobox');
        this.Room = page.locator('div').filter({ hasText: /^Room- Not selected -Floor 1, Room 101Floor 1, Room 102$/ }).getByRole('combobox');
        this.Bill = page.locator('div').filter({ hasText: /^Bill- Not selected -ID: 1$/ }).getByRole('combobox');
        this.SaveReservationButton = page.locator('a.btn.blue', { hasText: 'Save' });


    }

    // Methods
    async goto() {
        // Navigate to the base URL (ensure BASE_URL is set in environment variables)
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // CreateReservation method
    async createReservation(startDate: string = "2024-08-25", endDate: string = "2024-08-28") {
        // Fill in the start and end dates (use dynamic or default dates)
        await this.StartDate.fill(startDate);
        await this.EndDate.fill(endDate);

        // Select client, room, and bill options by index
        await this.Client.selectOption({ index: 1 });
        await this.Room.selectOption({ index: 1 });
        await this.Bill.selectOption({ index: 1 });

        // Click the Save button to submit the reservation
        await this.SaveReservationButton.click();
    }
}
