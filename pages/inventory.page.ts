import { Locator, Page } from 'playwright-core';
import { expect } from 'playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemImage: Locator;
  readonly inventoryDetailImage: Locator;
  readonly inventoryItemDescription: Locator;
  readonly inventoryItemPrice: Locator;
  readonly productSort: Locator;
  readonly backToProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('.btn_inventory');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryItemImage = page.locator('.inventory_item_img');
    this.inventoryDetailImage = page.locator('.inventory_details_img_container');
    this.inventoryItemDescription = page.locator('[data-test="inventory-item-desc"]');
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]');
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

// TBD: Cleaning locators
