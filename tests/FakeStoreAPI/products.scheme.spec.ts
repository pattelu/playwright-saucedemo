import { test } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { ProductsApi } from "../../src/api/endpoints/products";
import { validateProduct } from "../../src/utils/schemeValidators";

test.describe('products api scheme', () => {
    let productsApi: ProductsApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        productsApi = new ProductsApi(client);
    });

    test('verify product scheme for all products', async () => {
        const products = await productsApi.getAllProducts();
        products.forEach((product) => {
            validateProduct(product);
        })
    });

    test('verify product scheme for single product', async () =>{
        const product = await productsApi.getProductById(1);
        validateProduct(product);
    });
});