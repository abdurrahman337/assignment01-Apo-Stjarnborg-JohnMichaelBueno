import { expect, type Locator, type Page } from '@playwright/test';

export class CreateRoom {
    // Attributes
    readonly page: Page;
    readonly CategorySelect: Locator;
    readonly Room: Locator;
    readonly Floor: Locator;
    readonly Available: Locator;
    readonly Price: Locator;
    readonly Features: Locator;
    readonly SaveRoomButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.CategorySelect = page.getByRole('combobox');
        // this.Room = page.locator('input[name="roomNumber"]'); // Assume room number input
        this.Room = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton')
        //this.Floor = page.locator('input[name="floor"]'); // Assume floor input
        this.Floor = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton')
        //this.Available = page.locator('input[type="checkbox"]'); // For checkbox selection
        this.Available = page.locator('.checkbox')
        //this.Price = page.locator('input[type="number"]'); // Correcting the price field to use "number"
        this.Price = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton')
        this.Features = page.getByRole('listbox');

        this.SaveRoomButton = page.getByRole('button', { name: 'Save' });
    }

    // Methods / functions
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    // CreateRoom method
    async createRoom(roomNumber: string, floorNumber: string, roomPrice: string, features: string,) {
        // Select 'Double' option in the combobox
        await this.CategorySelect.selectOption({ index: 0 });
        await this.Room.fill("103");
        await this.Floor.fill("2");
        await this.Available.check(); 
        await this.Price.fill("1250");

        // Select features before saving
        await this.Features.selectOption({ index: 0 });

        // Save the room
        await this.SaveRoomButton.click
    }
}

