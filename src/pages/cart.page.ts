import { Locator, Page } from 'playwright-core';
import { expect } from 'playwright/test';

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  getProductCard(productName: string) {
    return this.page.locator('[data-test="inventory-item"]', {
      has: this.page.locator('[data-test="inventory-item-name"]', {
        hasText: productName,
      }),
    });
  }

  getTitle(productName: string) {
    return this.getProductCard(productName).locator('[data-test="inventory-item-name"]');
  }

  getPrice(productName: string) {
    return this.getProductCard(productName).locator('[data-test="inventory-item-price"]');
  }

  getDescription(productName: string) {
    return this.getProductCard(productName).locator('[data-test="inventory-item-desc"]');
  }

  async continueShopping() {
    this.continueShoppingButton.click();
  }

  async checkout() {
    this.checkoutButton.click();
  }

  async removeFromCart(productName: string) {
    await this.getProductCard(productName).locator('.cart_button').click();
  }

  async onCartPage() {
    await expect(this.page).toHaveURL(/cart/);
  }
}
