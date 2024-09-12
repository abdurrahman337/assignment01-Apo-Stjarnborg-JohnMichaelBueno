import { expect, type Locator, type Page } from '@playwright/test';
import { CreateRoom } from './Create-New-Room-Page';

export class ListRoomPage {
    // Attributes
    readonly page: Page;
    readonly usernameTextfield: Locator;
    readonly passwordTextfield: Locator;
    readonly loginButton: Locator;
    readonly createRoomButton: Locator;
    readonly editRoomButton: Locator;
    readonly ActionEdit: Locator;
    readonly Price: Locator;
    readonly SaveRoomButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.usernameTextfield = page.locator('input[type="text"]');
        this.passwordTextfield = page.locator('input[type="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.createRoomButton = page.getByRole('button', { name: 'Create Room' });
        this.ActionEdit = page.locator('.action');
        this.Price = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton');
        this.SaveRoomButton = page.getByRole('button', { name: 'Save' });  // Initialize Save button
    }

    // Methods
    async goto() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    async performLogin(username: string, password: string) {
        await this.usernameTextfield.fill(username);
        await this.passwordTextfield.fill(password);
        await this.loginButton.click();
        await expect(this.createRoomButton).toBeVisible();
        await this.createRoomButton.click();
    }

    async editButton() {
        await this.ActionEdit.first().click();
        const editLink = this.page.locator('#app > div > div.rooms > div > div.menu > a:nth-child(1)');
        await expect(editLink).toBeVisible();
        await editLink.click();
        await this.page.waitForTimeout(4000); // Adjust as needed
        const editRoom = new CreateRoom(this.page);
        await editRoom.createRoom("", "", "", "");

    }
}
