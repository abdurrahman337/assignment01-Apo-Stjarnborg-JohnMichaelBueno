import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    //Attributes
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly ViewRoomButton: Locator;
    readonly ViewClientButton: Locator;
    readonly ViewReservationButton: Locator;




    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.ViewRoomButton = page
            .locator('div', { hasText: /^RoomsNumber: 2View$/ }) // Locate div containing the text
            .getByRole('link'); // Then find the link within that div

        this.ViewClientButton = page.
            locator('div', { hasText: /^ClientsNumber: 2View$/ })
            .getByRole('link');


        this.ViewReservationButton = page.
            locator('div', { hasText: /^ReservationsTotal: 1Current: 0View$/ })
            .getByRole('link');

    }

    async performLogout() {
        await this.logoutButton.click();
        //await this.ViewRoomButton.click();

    }
    async performOpenRoom() {
        await this.ViewRoomButton.click();

    }
    async performOpenClient() {
        await this.ViewClientButton.click();
    }

    async performReservationOpenClient() {
        await this.ViewReservationButton.click();
    }



}
