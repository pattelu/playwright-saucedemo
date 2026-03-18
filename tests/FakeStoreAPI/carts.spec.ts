import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { CartsApi } from "../../src/api/endpoints/carts";
import { newCart, updateCart } from "../../src/fixtures/carts";
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
        const addNewCart = await cartsApi.createCart(newCart);
        validateCart(addNewCart);

        expect(addNewCart.userId).toBe(newCart.userId);
        expect(addNewCart.products[0].id).toBe(newCart.products[0].id);
    });

    test('PUT update a cart', async () => {
        const addNewCart = await cartsApi.createCart(newCart);
        validateCart(addNewCart);
        const updateExistingCart = await cartsApi.updateCart(addNewCart.id, updateCart);
        const updatedCart = {...addNewCart, ...updateExistingCart};
        validateCart(updatedCart);

        expect(updatedCart.userId).toBe(updateCart.userId)
        expect(updatedCart.products[0].id).toBe(newCart.products[0].id);
        expect(updatedCart.products[1].price).toBe(newCart.products[1].price);
    });

    test('DELETE cart', async () => {
        const addNewCart = await cartsApi.createCart(newCart);
        validateCart(addNewCart);
        await cartsApi.deleteCart(addNewCart.id);
    });
});