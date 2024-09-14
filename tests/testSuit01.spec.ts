import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { CreateRoom } from './pages/Create-New-Room-Page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';
import { CreateClientPage } from './pages/Create-New-Client-Page';
import { ListClientsPage } from './pages/List-Clients-Page';
import { ReservationPage } from './pages/List-Reservation-Page';
import { CreateReservationPage } from './pages/Create-New-Reservation-Page';
import { ListRoomPage } from './pages/List-Room-Page';
import { BillsPage } from './pages/List-Bills-Page';
import { CreateBillPage } from './pages/Create-New-Bills.Page';

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
    const listRoomPage = new ListRoomPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performOpenRoom();
    await listRoomPage.listRoom();
    await createRoompage.createRoom("", "", "", "");
    await page.waitForTimeout(2000);
    await listRoomPage.performBackToList()
    await expect(page.getByText('Number: 3')).toBeVisible();
    await page.waitForTimeout(2000);

  });

  //Create Client
  test('Test Case Create Clients ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const createClient = new CreateClientPage(page);
    const listClientsPage = new ListClientsPage(page);
    const updatedClientsDiv = page.locator('div').filter({ hasText: /^ClientsNumber: 3View$/ });

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performOpenClient();
    await listClientsPage.clickCreateClientButton();
    await createClient.createClient("", "", "");
    await page.waitForTimeout(2000);
    await listClientsPage.performBackToList();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Number: 3')).toBeVisible();
    await expect(updatedClientsDiv).toBeVisible();
    await page.waitForTimeout(2000);

  });

  //Create Bills
  test('Test Case Create Bills ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const listBills = new BillsPage(page);
    const createBill = new CreateBillPage(page)
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performOpenBills();
    await listBills.createBills();
    await createBill.createBill();
    await listBills.performBackToList();
    await expect(page.locator('div').filter({ hasText: /^Paid: 1 \(850kr\)$/ })).toBeVisible();
    await page.waitForTimeout(2000);



  });


  //Create UnPaidBills
  test('Test Case Create UnPaidBills ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const listBills = new BillsPage(page);
    const createBill = new CreateBillPage(page)
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performOpenBills();
    await listBills.createBills();
    await createBill.createUnPaidBill();
    await listBills.performBackToList();
    await expect(page.locator('div').filter({ hasText: 'Paid: 0 (0kr)' }).nth(4)).toBeVisible();
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
    const createReservation = new CreateReservationPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performReservationOpenClient();
    await createReservation.deleteReservation();

  });

  //Edit Room
  test('Test Case Edit Room ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const createRoompage = new CreateRoom(page);
    const listRoomPage = new ListRoomPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performOpenRoom();
    await listRoomPage.editButton();
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
    await page.waitForTimeout(3000);

  });

  test('Test Case Delete Client ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const listClients = new ListClientsPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performOpenClient();
    await listClients.deleteClients();
    await page.waitForTimeout(3000);


  });


});