import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
export class CreateBillPage {
    // Attributes
    readonly page: Page;
    readonly Value: Locator;
    readonly Paid: Locator;
    readonly SaveBillButton: Locator;
   

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.Value = page.locator('div').filter({ hasText: /^Value \(SEK\)$/ }).getByRole('spinbutton');
        // this.Room = page.locator('input[name="roomNumber"]'); // Assume room number input
        this.Paid = page.locator('.checkbox')
        //this.Floor = page.locator('input[name="floor"]'); // Assume floor input
        
       

        this.SaveBillButton = page.getByRole('button', { name: 'Save' });
    }

    // Methods / functions
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // CreateRoom method
    async createBill(billAmount) {
        // randomizes input data for a client using Faker
       billAmount = faker.number.int({min:1000, max:5000});
       
       
    
        // Select 'Double' option in the combobox
        await this.createBill(billAmount);
        
        // Save the room
        await this.SaveBillButton.click
    }
}