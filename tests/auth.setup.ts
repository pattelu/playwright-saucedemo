import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { standardUser } from '../fixtures/login';

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({
    path: 'storage/standardUser.json',
  });
});

//TBD: Different users storage
