import test, { expect } from 'playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderComponent } from '../pages/components/header.component';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { standardUser } from '../fixtures/login';
import { backpack, bikeLight } from '../fixtures/products';
import { checkoutConfirmation, checkoutInfo, errorCheckout } from '../fixtures/checkout';

test.describe('checkout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let headerComponent: HeaderComponent;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerComponent = new HeaderComponent(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.onListingPage();
    await inventoryPage.addToCart(backpack.name);
    await inventoryPage.addToCart(bikeLight.name);
    await headerComponent.cart();
    await cartPage.onCartPage();
    await cartPage.checkout();
    await checkoutPage.onCheckoutOne();
  });

  test.describe('checkout step one', () => {
    test('sucessful checkout step one', async () => {
      await checkoutPage.fillCheckoutInfo(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode,
      );
      await checkoutPage.onCheckoutTwo();
    });

    test('missing first name', async () => {
      await checkoutPage.fillCheckoutInfo('', checkoutInfo.lastName, checkoutInfo.postalCode);
      await expect(checkoutPage.getErrorMessage()).toContainText(errorCheckout.firstName);
    });
    test('missing last name', async () => {
      await checkoutPage.fillCheckoutInfo(checkoutInfo.firstName, '', checkoutInfo.postalCode);
      await expect(checkoutPage.getErrorMessage()).toContainText(errorCheckout.lastName);
    });

    test('missing postal', async () => {
      await checkoutPage.fillCheckoutInfo(checkoutInfo.firstName, checkoutInfo.lastName, '');
      await expect(checkoutPage.getErrorMessage()).toContainText(errorCheckout.postalCode);
    });

    test('cancel checkout - step one', async () => {
      await checkoutPage.cancel();
      await cartPage.onCartPage();
    });
  });

  test.describe('checkout step two', () => {
    test.beforeEach(async () => {
      await checkoutPage.fillCheckoutInfo(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode,
      );
      await checkoutPage.onCheckoutTwo();
    });

    test('sucessfull checkout step two', async () => {
      await checkoutPage.finish();
      await checkoutPage.onCheckoutComplete();
    });

    test('cancel checkout - step two', async () => {
      await checkoutPage.cancel();
      await inventoryPage.onListingPage();
    });

    test('correct cart item in checkout', async () => {
      await expect(checkoutPage.getTitle(backpack.name)).toContainText(backpack.name);
      await expect(checkoutPage.getDescription(backpack.name)).toContainText(backpack.description);
      await expect(checkoutPage.getPrice(backpack.name)).toContainText(backpack.price);
      await expect(checkoutPage.getTitle(bikeLight.name)).toContainText(bikeLight.name);
      await expect(checkoutPage.getDescription(bikeLight.name)).toContainText(
        bikeLight.description,
      );
      await expect(checkoutPage.getPrice(bikeLight.name)).toContainText(bikeLight.price);
    });

    test('correct price for items', async () => {
      await expect(await checkoutPage.sumPrices()).toEqual(await checkoutPage.getItemTotalPrice());
    });

    test('correct price with tax', async () => {
      await expect(await checkoutPage.sumWithTax()).toEqual(await checkoutPage.getTotalWithTax());
    });
  });
  test.describe('checkout complete', () => {
    test.beforeEach(async () => {
      await checkoutPage.fillCheckoutInfo(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode,
      );
      await checkoutPage.onCheckoutTwo();
      await checkoutPage.finish();
      await checkoutPage.onCheckoutComplete();
    });

    test('correct order info', async () => {
      await expect(checkoutPage.getCompleteHeader()).toContainText(checkoutConfirmation.header);
      await expect(checkoutPage.getCompleteText()).toContainText(checkoutConfirmation.text);
    });

    test('empty cart', async () => {
      await expect(headerComponent.getCartBadge()).toHaveCount(0);
    });

    test('back to home page', async () => {
      await checkoutPage.backHome();
      await inventoryPage.onListingPage();
    });
  });
});
