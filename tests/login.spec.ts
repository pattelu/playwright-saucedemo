import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { lockedOutUser, standardUser, errorMessages } from '../fixtures/login';
import { InventoryPage } from '../pages/inventory.page';

test.describe('login tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('sucessful login', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.onListingPage();
  });

  test('login with incorrect password', async () => {
    await loginPage.login(standardUser.username, 'incorrectpassword');
    await expect(loginPage.getErrorMessage()).toContainText(errorMessages.invalidCredentials);
  });

  test('login with missing username', async () => {
    await loginPage.login('', standardUser.password);
    await expect(loginPage.getErrorMessage()).toContainText(errorMessages.missingUsername);
  });

  test('login with missing password', async () => {
    await loginPage.login(standardUser.username, '');
    await expect(loginPage.getErrorMessage()).toContainText(errorMessages.missingPassword);
  });

  test('login with locked user', async () => {
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    await expect(loginPage.getErrorMessage()).toContainText(errorMessages.lockedUser);
  });
});
