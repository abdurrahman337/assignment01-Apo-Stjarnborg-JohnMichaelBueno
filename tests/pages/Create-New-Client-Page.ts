import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
export class CreateClientPage {
    // Attributes
    readonly page: Page;
    readonly ClientName: Locator;
    readonly Email: Locator;
    readonly Telephone: Locator;
    readonly SaveClientButton: Locator;


    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.ClientName = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        // this.Room = page.locator('input[name="roomNumber"]'); // Assume room number input
        this.Email = page.locator('input[type="email"]');
        //this.Floor = page.locator('input[name="floor"]'); // Assume floor input
        this.Telephone = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.SaveClientButton = page.getByText('Save');
    }

    // Methods / functions
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // CreateRoom method
    async createClient(clientName: string, clientEmail: string, clientTelephone: string) {
        // randomizes input data for a client using Faker
        clientName = faker.person.fullName();
        clientEmail = faker.internet.email();
        clientTelephone = faker.phone.number();

        // Select 'Double' option in the combobox
        await this.ClientName.fill(clientName);
        await this.Email.fill(clientEmail);
        await this.Telephone.fill(clientTelephone);
        // Save the room
        await this.SaveClientButton.click();
    }
}