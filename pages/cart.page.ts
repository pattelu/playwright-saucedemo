import { Locator, Page } from 'playwright-core';

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async continueShopping() {
    this.continueShoppingButton.click();
  }

  async checkout() {
    this.checkoutButton.click();
  }
}
