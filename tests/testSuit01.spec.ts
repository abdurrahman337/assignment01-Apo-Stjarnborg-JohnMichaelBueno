import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { CreateRoom } from './pages/Create-New-Room-Page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';
import { CreateClientPage } from './pages/Create-New-Client-Page';
import { ListClientsPage } from './pages/List-Clients-Page';
import { ReservationPage } from './pages/List-Reservation-Page';
import { CreateReservationPage } from './pages/Create-New-Reservation-Page';

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
    await listClientsPage.performLogin();
    await createClient.createClient("", "", "");
    /*
        const divWithClients = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ });
        await divWithClients.getByRole('link').click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('Clients')).toBeVisible();
    */
    /*  await page.getByRole('link', { name: 'Create Client' }).click();
        await page.waitForTimeout(2000);
        await expect(page.getByText('New Client')).toBeVisible();
        await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Alex')
        await page.locator('input[type="email"]').fill('alex@hotmail.se');
        await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill('073758585858')
    */
    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(2000);
    const linkReservation = page.getByRole('link', { name: 'Back' });
    await linkReservation.click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Number: 3')).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);



  });

  //Create unsuccessful Client
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
    const listreservationPage = new ReservationPage(page);
    const reservationPage = new CreateReservationPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    await dashboardPage.performReservationOpenClient();
    await listreservationPage.performLogin();

    await reservationPage.createReservation("2024-08-20", "2024-08-25");
    
    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await page.waitForTimeout(2000);


    /**   
 
     await divWithReservations.getByRole('link').click();
     await page.waitForTimeout(3000);
     await page.getByRole('link', { name: 'Create Reservation' }).click();
     await page.waitForTimeout(2000);
     await expect(page.getByText('New Reservation')).toBeVisible();
     await page.waitForTimeout(2000);
 
     await page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill('2024-10-15')
     await page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill('2024-10-20')
 
     await page.locator('div').filter({ hasText: /^Client- Not selected -Jonas Hellman \(#1\)Mikael Eriksson \(#2\)$/ }).getByRole('combobox').selectOption('2');
     await page.locator('div').filter({ hasText: /^Room- Not selected -Floor 1, Room 101Floor 1, Room 102$/ }).getByRole('combobox').selectOption('2');
     await page.locator('div').filter({ hasText: /^Bill- Not selected -ID: 1$/ }).getByRole('combobox').selectOption('1');
     await page.locator('a.btn.blue', { hasText: 'Save' }).click();
     await page.waitForTimeout(4000);
     // await expect(page.locator('text="Mikael Eriksson: 2024-10-15 - 2024-10-20Booking ID: 2Start: 2024-10-15End: 2024"')).toBeVisible();
     // Verifiera att en rubrik med specifik text är synlig
     await expect(page.getByRole('heading', { name: 'Mikael Eriksson: 2024-10-15' })).toBeVisible();
 
     const linkReservations = page.getByRole('link', { name: 'Back' });
     await linkReservations.click();
     await page.waitForTimeout(2000);
     // Verifiera att texten är synlig på sidan
     await expect(page.getByText('ReservationsTotal: 2Current:')).toBeVisible();
     await page.locator('button', { hasText: 'Logout' }).click();
     await page.waitForTimeout(2000); */


  });


  test('Test Case Edit Room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await page.waitForTimeout(2000);
    const divWithText = page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ });

    // Find the link within that div and click it
    await divWithText.getByRole('link').click();
    await expect(page.getByText('Rooms')).toBeVisible();
    // Verifiera att texten "101" är synlig på sidan
    await expect(page.getByText('101', { exact: true })).toBeVisible();
    await expect(page.getByText('101 Floor 1, Room 101Category')).toBeVisible();
    // Klicka på det första elementet med klassen 'action'
    await page.locator('.action').first().click();
    await page.getByText('Edit').click();
    await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('110')
    await page.waitForTimeout(2000);
    await page.locator('a.btn.blue', { hasText: 'Save' }).click();
    await expect(page.getByText('110', { exact: true })).toBeVisible();
    await expect(page.getByText('110 Floor 1, Room 110Category')).toBeVisible();

    await page.waitForTimeout(4000);
    const linkEditRoom = page.getByRole('link', { name: 'Back' });
    await linkEditRoom.click();
    await page.waitForTimeout(2000);
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);



  });
  test('Test Case Delete Client', async ({ page }) => {
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
    await expect(page.getByText('JH Jonas Hellman (#1)Email:')).toBeVisible();
    await page.getByRole('img').first().click();
    await page.getByText('Delete').click();
    await page.waitForTimeout(2000);
    const linkEditRoom = page.getByRole('link', { name: 'Back' });
    await linkEditRoom.click();
    await page.waitForTimeout(2000);
    // Verifiera att texten 'ClientsNumber: 1View' är synlig på sidan
    await expect(page.getByText('ClientsNumber: 1View')).toBeVisible();
    await page.locator('button', { hasText: 'Logout' }).click();
    await page.waitForTimeout(2000);





  });





});