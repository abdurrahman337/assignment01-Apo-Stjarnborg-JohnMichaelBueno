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
    readonly ActionDelete: Locator;
    readonly DropdownOptions: Locator;
    readonly headingLocator: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.StartDate = page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.EndDate = page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD');
        this.Client = page.locator('div').filter({ hasText: /^Client- Not selected -Jonas Hellman \(#1\)Mikael Eriksson \(#2\)$/ }).getByRole('combobox');
        this.Room = page.locator('div').filter({ hasText: /^Room- Not selected -Floor 1, Room 101Floor 1, Room 102$/ }).getByRole('combobox');
        this.Bill = page.locator('div').filter({ hasText: /^Bill- Not selected -ID: 1$/ }).getByRole('combobox');
        this.SaveReservationButton = page.locator('a.btn.blue', { hasText: 'Save' });
        this.ActionDelete = page.locator('.action');
        this.DropdownOptions = page.locator(('#app > div > div.reservations > div > div.menu > a:nth-child(2)'));
        this.headingLocator = page.locator('role=heading[name="Jonas Hellman: 2020-04-01 -"]');


    }



    // CreateReservation method
    async createReservation(startDate: string = "2024-08-25", endDate: string = "2024-08-28") {
        await this.StartDate.fill(startDate);
        await this.EndDate.fill(endDate);
        await this.Client.selectOption({ index: 1 });
        await this.Room.selectOption({ index: 1 });
        await this.Bill.selectOption({ index: 1 });
        await this.SaveReservationButton.click();
    }


    // DeleteReservation method
    async deleteReservation() {
        await this.ActionDelete.click();
        await this.DropdownOptions.click();
        await expect(this.headingLocator).not.toBeVisible();
    }
}
