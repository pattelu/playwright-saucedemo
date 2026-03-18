import { test, expect } from "playwright/test";
import { ApiClient } from "../../src/api/client";
import { ProductsApi } from "../../src/api/endpoints/products";
import { newProduct, updateProduct } from "../../src/fixtures/products";
import { validateProduct } from "../../src/utils/schemeValidators";

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

    test('POST create new product', async () => {
        const createdNewProduct = await productsApi.createProduct(newProduct);
        validateProduct(createdNewProduct);

        expect(createdNewProduct.title).toBe(newProduct.title);
        expect(createdNewProduct.price).toBe(newProduct.price);
    });

    test('PUT update a prodcut', async () => {
        const createdNewProduct = await productsApi.createProduct(newProduct);
        validateProduct(createdNewProduct);
        const updateExistingProduct = await productsApi.updateProduct(createdNewProduct.id, updateProduct);
        const updatedProduct = {...createdNewProduct, ...updateExistingProduct};
        validateProduct(updatedProduct);

        expect(updatedProduct.description).toBe(updateProduct.description)
        expect(updatedProduct.price).toBe(updateProduct.price);
        expect(updatedProduct.title).toBe(newProduct.title);
        expect(updatedProduct.category).toBe(newProduct.category);
    });

    test('DELETE product', async () => {
        const createdNewProduct = await productsApi.createProduct(newProduct);
        validateProduct(createdNewProduct);
        await productsApi.deleteProduct(createdNewProduct.id);
    });
});