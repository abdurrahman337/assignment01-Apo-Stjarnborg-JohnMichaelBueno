import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    //Attributes
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly ViewRoomButton: Locator;
    readonly ViewClientButton: Locator;
    readonly ViewBillButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.ViewRoomButton = page
            .locator('div', { hasText: /^RoomsNumber: 2View$/ }) // Locate div containing the text
            .getByRole('link'); // Then find the link within that div
        
        this.ViewClientButton = page.
            locator('div', { hasText: /^ClientsNumber: 2View$/ })
            .getByRole('link');
        
        this.ViewBillButton = page.
            locator('div', { hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ })
            .getByRole('link');


    }

    async performLogout() {
        await this.logoutButton.click();
        await this.ViewRoomButton.click();

    }
    async performdasboard() {
        await this.ViewRoomButton.click();

    }
    async performOpenClient(){
        await this.ViewClientButton.click();
    }
    async perfromOpenBill(){
        await this.ViewBillButton.click();
    }


}

/*import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    // Attributes
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly ViewRoomButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Locate the logout button by role
        this.logoutButton = page.getByRole('button', { name: 'Logout' });

        // First, locate the div with the specified text and then locate the link inside it
        this.ViewRoomButton = page
            .locator('div', { hasText: /^RoomsNumber: 2View$/ }) // Locate div containing the text
            .getByRole('link'); // Then find the link within that div
    }

    // Method to perform logout
    async performLogout() {
        await this.logoutButton.click();
    }

    // Method to click on the ViewRoomButton
    async performDashboard() {
        await this.ViewRoomButton.click();
    }
}
*/