import { test, expect } from 'playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { standardUser } from '../fixtures/login';
import { backpack } from '../fixtures/products';
import { HeaderComponent } from '../pages/components/header.component';

test.describe('products', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let headerComponent: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerComponent = new HeaderComponent(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    await inventoryPage.onListingPage();
  });

  test.describe('listing page', () => {
    test('verify item name', async () => {
      await expect(inventoryPage.getTitle(backpack.name)).toContainText(backpack.name);
    });

    test('verify item description', async () => {
      await expect(inventoryPage.getDescription(backpack.name)).toContainText(backpack.description);
    });

    test('verify item price', async () => {
      await expect(inventoryPage.getPrice(backpack.name)).toContainText(backpack.price);
    });

    test('verify item image', async () => {
      await expect(inventoryPage.getImage(backpack.name)).toHaveAttribute('src', backpack.image);
    });

    test('open product details with title', async () => {
      await inventoryPage.openDetailsByTitle(backpack.name);
      await inventoryPage.onDetailsPage();
    });

    test('open product details with image', async () => {
      await inventoryPage.openDetailsByImage(backpack.name);
      await inventoryPage.onDetailsPage();
    });

    test('add item to cart', async () => {
      await inventoryPage.addToCart(backpack.name);
      await expect(headerComponent.getCartBadge()).toContainText('1');
    });

    test('remove item from cart', async () => {
      await inventoryPage.addToCart(backpack.name);
      await expect(headerComponent.getCartBadge()).toContainText('1');
      await inventoryPage.removeFromCart(backpack.name);
      await expect(headerComponent.getCartBadge()).toHaveCount(0);
    });

    test.describe('sorting products', () => {
      test('sorting by names Z-A', async () => {
        await inventoryPage.sortBy('za');
        await inventoryPage.namesSorted('desc');
      });
      test('sorting by names A-Z', async () => {
        await inventoryPage.sortBy('az');
        await inventoryPage.namesSorted('asc');
      });
      test('sorting by prices high to low', async () => {
        await inventoryPage.sortBy('hilo');
        await inventoryPage.pricesSorted('desc');
      });
      test('sorting by prices low to high', async () => {
        await inventoryPage.sortBy('lohi');
        await inventoryPage.pricesSorted('asc');
      });
    });
  });

  test.describe('product details', () => {
    test('add item to cart', async () => {
      await inventoryPage.addToCartDetailsPage(backpack.name);
      await expect(headerComponent.getCartBadge()).toContainText('1');
    });

    test('back to listing page for detail page', async () => {
      await inventoryPage.openDetailsByImage(backpack.name);
      await inventoryPage.backToListingPage();
      await inventoryPage.onListingPage();
    });

    test('remove item from cart', async () => {
      await inventoryPage.addToCartDetailsPage(backpack.name);
      await expect(headerComponent.getCartBadge()).toContainText('1');
      await inventoryPage.removeFromCart(backpack.name);
      await expect(headerComponent.getCartBadge()).toHaveCount(0);
    });

    test('verify item description', async () => {
      await inventoryPage.openDetailsByImage(backpack.name);
      await expect(inventoryPage.getDescription(backpack.name)).toContainText(backpack.description);
    });

    test('verify item price', async () => {
      await inventoryPage.openDetailsByImage(backpack.name);
      await expect(inventoryPage.getPrice(backpack.name)).toContainText(backpack.price);
    });

    test('verify item image', async () => {
      await inventoryPage.openDetailsByImage(backpack.name);
      await expect(inventoryPage.getImage(backpack.name)).toHaveAttribute('src', backpack.image);
    });
  });
});
