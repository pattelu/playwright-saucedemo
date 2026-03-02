import { Locator, Page } from 'playwright-core';
import { expect } from 'playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly productSort: Locator;
  readonly backToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('.btn_inventory');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemPrices = page.locator('[data-test="inventory-item-price"]');
    this.productSort = page.locator('[data-test="product-sort-container"]');
    this.backToProducts = page.locator('[data-test="back-to-products"]');
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

  getImage(productName: string) {
    return this.getProductCard(productName).locator(`[alt="${productName}"]`);
  }

  async getAllItemNames() {
    return await this.inventoryItemNames.allTextContents();
  }

  async getAllPrices() {
    const prices = await this.inventoryItemPrices.allTextContents();
    return prices.map((p) => parseFloat(p.replace('$', '')));
  }

  async namesSorted(order = 'asc') {
    const names = await this.getAllItemNames();
    let sorted = [...names];
    if (order === 'asc') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else {
      sorted.sort((a, b) => b.localeCompare(a));
    }
    expect(names).toEqual(sorted);
  }

  async pricesSorted(order = 'asc') {
    const prices = await this.getAllPrices();
    let sorted = [...prices];
    if (order === 'asc') {
      sorted.sort((a, b) => a - b);
    } else {
      sorted.sort((a, b) => b - a);
    }
    expect(prices).toEqual(sorted);
  }

  async sortBy(sort: string) {
    await this.productSort.selectOption(sort);
  }

  async addToCart(productName: string) {
    await this.getProductCard(productName).locator('.btn_inventory').click();
  }

  async removeFromCart(productName: string) {
    await this.getProductCard(productName).locator('.btn_inventory').click();
  }

  async addToCartDetailsPage(productName: string) {
    await this.getProductCard(productName).locator('[data-test="inventory-item-name"]').click();
    await this.addToCartButton.click();
  }

  async openDetailsByTitle(productName: string) {
    await this.getTitle(productName).click();
  }

  async openDetailsByImage(productName: string) {
    await this.getImage(productName).click();
  }

  async backToListingPage() {
    await this.backToProducts.click();
  }

  async onListingPage() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async onDetailsPage() {
    await expect(this.page).toHaveURL(/inventory-item/);
  }
}
