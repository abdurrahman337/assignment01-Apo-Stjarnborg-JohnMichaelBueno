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



  test('Test Case OnePage', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    //await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link').click();
    await page.waitForTimeout(2000);
    // Locate the div containing the exact text 'RoomsNumber: 2View'
    const divWithText = page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ });

    // Find the link within that div and click it
    await divWithText.getByRole('link').click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Rooms')).toBeVisible();
    // Assuming getByRole is part of the testing library you're using
    const link = page.getByRole('link', { name: 'Back' });
    await link.click();
    await page.waitForTimeout(2000);

    const divWithClients = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ });
    await divWithClients.getByRole('link').click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Clients')).toBeVisible();
    const linkClients = page.getByRole('link', { name: 'Back' });
    await linkClients.click();
    await page.waitForTimeout(2000);

    //locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link')

    const divWithBills = page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ });
    await divWithBills.getByRole('link').click();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Bills')).toBeVisible();
    const linkBill = page.getByRole('link', { name: 'Back' });
    await linkBill.click();
    await page.waitForTimeout(2000);


    const divWithReservations = page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ });
    await divWithReservations.getByRole('link').click();
    await page.waitForTimeout(3000);
    await expect(page.getByText('Reservations')).toBeVisible();
    const linkReservation = page.getByRole('link', { name: 'Back' });
    await linkReservation.click();
    await page.waitForTimeout(2000);

    // Locate the button with the name 'Logout' and click it
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);



  });


  //Create Room
  test('Test Case Create Room ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    // Locate the div containing the exact text 'RoomsNumber: 2View'
    const divWithText = page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ });

    // Find the link within that div and click it
    await divWithText.getByRole('link').click();
    await expect(page.getByText('Rooms')).toBeVisible();

    await page.getByRole('link', { name: 'Create Room' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox').click();
    await page.selectOption('select', { value: 'single' });
    await page.waitForTimeout(1000);
    await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('3');
    await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('1');
    // Click the checkbox with the class '.checkbox'
    await page.locator('.checkbox').click();

    await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill('1250')

    await page.getByRole('listbox').selectOption('balcony');

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(2000);

    const linkReservation = page.getByRole('link', { name: 'Back' });
    await linkReservation.click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Number: 3')).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);

  });

  //Create Client
  test('Test Case Create Clients ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);

    const divWithClients = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ });
    await divWithClients.getByRole('link').click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Clients')).toBeVisible();

    await page.getByRole('link', { name: 'Create Client' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('New Client')).toBeVisible();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Alex')
    await page.locator('input[type="email"]').fill('alex@hotmail.se');
    await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill('073758585858')

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(2000);
    const linkReservation = page.getByRole('link', { name: 'Back' });
    await linkReservation.click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Number: 3')).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);


  });

  //Create Client
  test('Test Case Unsuccessful Create Clients ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);

    const divWithClients = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ });
    await divWithClients.getByRole('link').click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Clients')).toBeVisible();

    await page.getByRole('link', { name: 'Create Client' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('New Client')).toBeVisible();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Sam')
    await page.locator('input[type="email"]').fill('');
    await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill('073758585858')

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    // Check if the error message is visible
    const errorMessage = await page.locator('div.error', { hasText: 'Email must be set' });
    await expect(errorMessage).toBeVisible();
    await page.waitForTimeout(5000);


    await page.locator('input[type="email"]').fill('sam@hotmail.se');

    // Assertion to check if the error message is visible
    await page.waitForTimeout(2000);

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(2000);

    const linkReservation = page.getByRole('link', { name: 'Back' });
    await linkReservation.click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Number: 3')).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);


  });



  //Create Bills
  test('Test Case Create Bills ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    const divWithBills = page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ });
    await divWithBills.getByRole('link').click();
    await page.waitForTimeout(3000);

    await page.getByRole('link', { name: 'Create Bill' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('New Bill')).toBeVisible();
    await page.locator('div').filter({ hasText: /^Value \(SEK\)$/ }).getByRole('spinbutton').fill('100');

    // Click the checkbox with the class '.checkbox'
    await page.locator('.checkbox').click();

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(4000);
    const linkBillss = page.getByRole('link', { name: 'Back' });
    await linkBillss.click();
    await page.waitForTimeout(2000);
    await expect(page.locator('div').filter({ hasText: /^Paid: 1 \(100kr\)$/ })).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);



  });


  //Create Reservation
  test('Test Case Create Reservation ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);

    const divWithReservations = page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ });
    await divWithReservations.getByRole('link').click();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Create Reservation' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('New Reservation')).toBeVisible();



    /*
    await page.locator('div').filter({ hasText: /^Value \(SEK\)$/ }).getByRole('spinbutton').fill('100');

    // Click the checkbox with the class '.checkbox'
    await page.locator('.checkbox').click();

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(4000);
    const linkBillss = page.getByRole('link', { name: 'Back' });
    await linkBillss.click();
    await page.waitForTimeout(2000);
    await expect(page.locator('div').filter({ hasText: /^Paid: 1 \(100kr\)$/ })).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);*/



  });





});