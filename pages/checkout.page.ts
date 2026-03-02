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

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.errorMessage = page.locator('[data-test="error-button"]');
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

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}
