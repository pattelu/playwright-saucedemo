import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { CartsApi } from "../../src/api/endpoints/carts";
import { newCartData, updateCartData } from "../../src/fixtures/carts";
import { validateCart } from "../../src/utils/schemeValidators";

test.describe('carts api', () => {
    let cartsApi: CartsApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        cartsApi = new CartsApi(client);
    });

    test('GET carts list', async () => {
        const carts = await cartsApi.getAllCarts();
        expect(carts.length).toBeGreaterThan(0);
    });

    test('GET cart by ID', async () =>{
        const cart = await cartsApi.getCartById(1);
        expect(cart.id).toBe(1);
    });

    test('POST add new cart', async () => {
        const addNewCart = await cartsApi.createCart(newCartData);
        validateCart(addNewCart);

        expect(addNewCart.userId).toBe(newCartData.userId);
        expect(addNewCart.products[0].id).toBe(newCartData.products[0].id);
    });

    test('PUT update a cart', async () => {
        const addNewCart = await cartsApi.createCart(newCartData);
        validateCart(addNewCart);
        const updateExistingCart = await cartsApi.updateCart(addNewCart.id, updateCartData);
        const updatedCart = {...addNewCart, ...updateExistingCart};
        validateCart(updatedCart);

        expect(updatedCart.userId).toBe(updateCartData.userId)
        expect(updatedCart.products[0].id).toBe(newCartData.products[0].id);
        expect(updatedCart.products[1].price).toBe(newCartData.products[1].price);
    });

    test('DELETE cart', async () => {
        const addNewCart = await cartsApi.createCart(newCartData);
        validateCart(addNewCart);
        await cartsApi.deleteCart(addNewCart.id);
    });
});