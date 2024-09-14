import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
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
        this.Room = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton')
        this.Floor = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton')
        this.Available = page.locator('.checkbox')
        this.Price = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton')
        this.Features = page.getByRole('listbox');
        this.SaveRoomButton = page.locator('a.btn.blue', { hasText: 'Save' });
    }

    // CreateRoom method
    async createRoom(roomNumber: string, floorNumber: string, roomPrice: string, features: string,) {
        // randomizes input data for a Room using Faker
        roomNumber = faker.number.int({ max: 100 }).toString();
        floorNumber = faker.number.int({ min: 1, max: 5 }).toString();
        roomPrice = faker.number.int({ min: 500, max: 5000 }).toString();
        await this.CategorySelect.selectOption({ index: 0 });
        await this.Room.fill(roomNumber);
        await this.Floor.fill(floorNumber);
        await this.Price.fill(roomPrice);
        await this.Features.selectOption({ index: 0 });
        await this.SaveRoomButton.click();
    }
}

