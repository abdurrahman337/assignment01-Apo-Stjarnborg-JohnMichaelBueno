import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationPage {
    //Attributes
    readonly page: Page;

    readonly CreateReservationButton: Locator;
    // readonly backButton: Locator;


    //Const
    constructor(page: Page) {
        this.page = page;
        this.CreateReservationButton = page.getByRole('link', { name: 'Create Reservation' });
        // this.backButton = page.getByRole('button', { name: 'Back' });

    }

    // Methods / functions
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }
    async performLogin() {

        await this.CreateReservationButton.click();
        // await this.backButton.click();



    }
}