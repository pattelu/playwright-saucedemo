import { Locator, Page } from 'playwright-core';

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

  //TBD: addToCart, getTitle, getDescription, getPrice, getImage, openDetailsPage (by image, by name), backToProducts

  productCard(productName: string) {
    return this.page.locator('[data-test="inventory-item"]', {
      has: this.page.locator('[data-test="inventory-item-name"]', {
        hasText: productName,
      }),
    });
  }

  async addToCart(productName: string) {
    await this.productCard(productName).locator('.btn_inventory').click();
  }

  async addToCartDetailsPage() {
    await this.inventoryItem.click();
    await this.addToCartButton.click();
  }
}
