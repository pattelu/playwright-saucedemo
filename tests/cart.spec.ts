import test, { expect } from 'playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderComponent } from '../pages/components/header.component';
import { CartPage } from '../pages/cart.page';
import { standardUser } from '../fixtures/login';
import { backpack, bikeLight } from '../fixtures/products';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('cart', () => {
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
  });

  test('verify product in cart', async () => {
    await inventoryPage.addToCart(backpack.name);
    await headerComponent.cart();
    await cartPage.onCartPage();
    await expect(cartPage.getTitle(backpack.name)).toContainText(backpack.name);
    await expect(cartPage.getDescription(backpack.name)).toContainText(backpack.description);
    await expect(cartPage.getPrice(backpack.name)).toContainText(backpack.price);
  });

  test('remove product from cart', async () => {
    await inventoryPage.addToCart(backpack.name);
    await expect(headerComponent.getCartBadge()).toContainText('1');
    await headerComponent.cart();
    await cartPage.onCartPage();
    await cartPage.removeFromCart(backpack.name);
    await expect(cartPage.getProductCard(backpack.name)).toHaveCount(0);
    await expect(headerComponent.getCartBadge()).toHaveCount(0);
  });

  test('back to listing page', async () => {
    await headerComponent.cart();
    await cartPage.onCartPage();
    await cartPage.continueShopping();
    await inventoryPage.onListingPage();
  });

  test('go to checkout page', async () => {
    await headerComponent.cart();
    await cartPage.onCartPage();
    await cartPage.checkout();
    await checkoutPage.onCheckoutOne();
  });
});
