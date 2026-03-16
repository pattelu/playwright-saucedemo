import { parse } from 'node:path';
import { Locator, Page } from 'playwright-core';
import { expect } from 'playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly backHomeButton: Locator;
  readonly errorMessage: Locator;
  readonly itemPrices: Locator;
  readonly itemTotalPrice: Locator;
  readonly tax: Locator;
  readonly totalPrice: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemTotalPrice = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
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

  getErrorMessage() {
    return this.errorMessage;
  }

  getCompleteHeader() {
    return this.completeHeader;
  }

  getCompleteText() {
    return this.completeText;
  }

  async getTax() {
    const taxText = await this.tax.innerText();
    return parseFloat(taxText.replace('Tax: $', ''));
  }

  async getItemTotalPrice() {
    const priceText = await this.itemTotalPrice.innerText();
    return parseFloat(priceText.replace('Item total: $', ''));
  }

  async getTotalWithTax() {
    const totalText = await this.totalPrice.innerText();
    return parseFloat(totalText.replace('Total: $', ''));
  }

  async getAllPrices() {
    const prices = await this.itemPrices.allTextContents();
    return prices.map((p) => parseFloat(p.replace('$', '')));
  }

  async sumPrices() {
    const prices = await this.getAllPrices();
    const total = prices.reduce((sum, prices) => sum + prices, 0);
    return total;
  }

  async sumWithTax() {
    const items = await this.sumPrices();
    const tax = await this.getTax();
    const total = items + tax;
    return total;
  }

  async onCheckoutOne() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async onCheckoutTwo() {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async onCheckoutComplete() {
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async backHome() {
    await this.backHomeButton.click();
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}
