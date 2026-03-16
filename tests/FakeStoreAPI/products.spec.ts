import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { ProductsApi } from "../../src/api/endpoints/products";
import { Product } from "../../src/types/product";

test.describe('products api', () => {
    let productsApi: ProductsApi;

    test.beforeAll(async () => {
        const client = new ApiClient();
        await client.init();

        productsApi = new ProductsApi(client);
    });

    test('GET products list', async () => {
        const products = await productsApi.getAllProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    test('GET product by ID', async () =>{
        const product = await productsApi.getProductById(1);
        expect(product.id).toBe(1);
    });
});