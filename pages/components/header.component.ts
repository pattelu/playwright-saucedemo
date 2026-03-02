import { Locator, Page } from 'playwright-core';

export class HeaderComponent {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly menuCloseButton: Locator;
  readonly allItemsButton: Locator;
  readonly aboutButton: Locator;
  readonly logoutButton: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('[data-test="open-menu"]');
    this.menuCloseButton = page.locator('[data-test="close-menu"]');
    this.allItemsButton = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutButton = page.locator('[data-test="about-sidebar-link"]');
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  getCartBadge() {
    return this.cartBadge;
  }

  async allItems() {
    await this.menuButton.click();
    await this.allItemsButton.click();
  }

  async about() {
    await this.menuButton.click();
    await this.aboutButton.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }

  async cart() {
    await this.cartButton.click();
  }
}
