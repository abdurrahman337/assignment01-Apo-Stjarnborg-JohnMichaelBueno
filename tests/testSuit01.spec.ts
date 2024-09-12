import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { CreateRoom } from './pages/Create-New-Room-Page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';
import { CreateClientPage } from './pages/Create-New-Client-Page';
import { ListClientsPage } from './pages/List-Clients-Page';
import { ReservationPage } from './pages/List-Reservation-Page';
import { CreateReservationPage } from './pages/Create-New-Reservation-Page';
import { DeleteReservationPage } from './pages/Delete-Reservation-Pages';
import { ListRoomPage } from './pages/List-Room-Page';

const randomName = faker.person.firstName();
const randomPassword = faker.internet.password();


test.describe('Test suite 01', () => {
  test('Succesfull LogIn', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.waitForTimeout(5000);
  });


  //Create Room
  test('Test Case Create Room ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const createRoompage = new CreateRoom(page);

    await loginPage.goto();
    await createRoompage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performdasboard();
    const CreateRoomButton = page.getByRole('link', { name: 'Create Room' }).click();
    await createRoompage.createRoom("3", "1", "1250", "balcony");
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
    const createClient = new CreateClientPage(page);
    const listClientsPage = new ListClientsPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);

    await dashboardPage.performOpenClient();
    await listClientsPage.clickCreateClientButton();
    await createClient.createClient("", "", "");
    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(2000);
    const linkReservation = page.getByRole('link', { name: 'Back' });
    await linkReservation.click();
    await page.waitForTimeout(2000);
    // Ensure that the number of clients has increased to 3
    await expect(page.getByText('Number: 3')).toBeVisible();

    // Refined locator to filter and check the specific 'ClientsNumber: 3View' pattern
    const updatedClientsDiv = page.locator('div').filter({ hasText: /^ClientsNumber: 3View$/ });
    await expect(updatedClientsDiv).toBeVisible();  // Assertion to confirm the number of clients
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


  //Create Bills
  test('Test Case Create UnPaidBills ', async ({ page }) => {
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
    await page.locator('div').filter({ hasText: /^Value \(SEK\)$/ }).getByRole('spinbutton').fill('200');

    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(4000);
    const linkBillss = page.getByRole('link', { name: 'Back' });
    await linkBillss.click();
    await page.waitForTimeout(2000);
    await expect(page.locator('div').filter({ hasText: 'Paid: 0 (0kr)' }).nth(4)).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);



  });



  //Create Reservation
  test('Test Case Create Reservation ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const listreservationPage = new ReservationPage(page);
    const reservationPage = new CreateReservationPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performReservationOpenClient();
    await listreservationPage.performLogin();
    await reservationPage.createReservation("2024-08-20", "2024-08-25");
    await expect(page.locator('div').filter({ hasText: 'Jonas Hellman: 2024-08-20 -' }).nth(0)).toBeVisible();
    await page.waitForTimeout(2000);



  });


  test('Test Case Delete Reservation ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const listreservationPage = new ReservationPage(page);
    const deleteReservationPage = new DeleteReservationPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performReservationOpenClient();
    await deleteReservationPage.deleteReservation();

  });

  //Edit Room
  test('Test Case Edit Room ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const createRoompage = new CreateRoom(page);
    const listRoomPage = new ListRoomPage(page);
    await loginPage.goto();
    await createRoompage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performdasboard();
    await listRoomPage.editButton();
    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(3000);

  });



  //Edit Room
  test('Test Case Edit Client ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const listClientPage = new ListClientsPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performOpenClient();
    await listClientPage.editClient();
    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(3000);

  });


});