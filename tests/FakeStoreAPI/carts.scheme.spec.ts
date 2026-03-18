import { test } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { validateCart } from "../../src/utils/schemeValidators";
import { CartsApi } from "../../src/api/endpoints/carts";

test.describe('carts api scheme', () => {
    let cartsApi: CartsApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        cartsApi = new CartsApi(client);
    });

    test('verify cart scheme for all carts', async () => {
        const carts = await cartsApi.getAllCarts();
        carts.forEach((cart) => {
            validateCart(cart);
        })
    });

    test('verify cart scheme for single cart', async () =>{
        const cart = await cartsApi.getCartById(1);
        validateCart(cart);
    });
});