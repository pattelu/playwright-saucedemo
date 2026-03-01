import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { lockedOutUser, standardUser, errorMessages } from '../../../fixtures/login';

test.describe('@smoke login tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('sucessful login', async () => {
    await loginPage.login(standardUser.username, standardUser.password);
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  test('login with incorrect password', async ({ page }) => {
    await loginPage.login(standardUser.username, 'incorrectpassword');
    await expect(await loginPage.getErrorMessage()).toContain(errorMessages.invalidCredentials);
  });

  test('login with missing username', async ({ page }) => {
    await loginPage.login('', standardUser.password);
    await expect(await loginPage.getErrorMessage()).toContain(errorMessages.missingUsername);
  });

  test('login with missing password', async ({ page }) => {
    await loginPage.login(standardUser.username, '');
    await expect(await loginPage.getErrorMessage()).toContain(errorMessages.missingPassword);
  });

  test('login with locked user', async ({ page }) => {
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);
    await expect(await loginPage.getErrorMessage()).toContain(errorMessages.lockedUser);
  });
});
