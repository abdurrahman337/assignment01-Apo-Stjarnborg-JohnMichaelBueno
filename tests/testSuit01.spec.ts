import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';

const randomName = faker.person.firstName();
const randomPassword = faker.internet.password();


test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.waitForTimeout(5000);
  });

  test('Unsuccessful login by UserName', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Generate a random username
    const randomName = faker.internet.userName();
    await loginPage.goto();
    await loginPage.performLogin(randomName, `${process.env.TEST_PASSWORD}`);
    await page.waitForTimeout(5000);
    await expect(page.getByText('Bad username or password')).toBeVisible();
  });


  test('Unsuccessful login by Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Generate a random username
    const randomName = faker.internet.password();
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, randomPassword);
    await page.waitForTimeout(5000);
    await expect(page.getByText('Bad username or password')).toBeVisible();
  });

});